import { DateRangeEnum } from "../enums/date-range.enum.js";
import { getDateRange } from "../utils/date.js";
import TransactionModel, { TransactionTypeEnum } from "../models/transaction.model.js";
import mongoose from "mongoose";
import { financialInsightsPrompt } from "../utils/prompt.js";
import { genAI, genAIModel } from "../config/google-ai.config.js";
import { createUserContent } from "@google/genai";
import { formatCurrency } from "../utils/format-currency.js";
import { format, isToday } from "date-fns";
import FinancialInsightModel from "../models/insights.model.js";
import { calculateFinancialHealthScore } from "../utils/health-score.js";

export interface AIInsightsContext {
    summary: {
        totalIncome: string;
        totalExpense: string;
        balance: string;
        currentSavingsRate: number;
        previousSavingsRate: number;
        incomeChange: number | null;
        expenseChange: number | null;
        savingsRateDifference: number;
        transactionCount: number;
    };

    topCategory: {
        name: string;
        amount: string;
        expenseShare: number;
        transactionCount: number;
    } | null;

    categoryChanges: Array<{
        category: string;
        currentAmount: string;
        previousAmount: string;
        percentageChange: number | null;
    }>;
}

export const getInsightsService = async (userId: string) => {
    const period = format(new Date(), "yyyy-MM");

    const cached = await FinancialInsightModel.findOne({
        userId,
        period
    });

    if (cached && isToday(cached.generatedAt)) {
        return {
            healthScore: cached.healthScore,
            insights: cached.insights,
            recommendations: cached.recommendations,
        };
    }

    const thisMonth = getDateRange(DateRangeEnum.THIS_MONTH);
    const prevMonth = getDateRange(DateRangeEnum.LAST_MONTH);

    const currentMetrics = await getFinancialMetrics(
        userId,
        thisMonth.from!,
        thisMonth.to!
    );

    const previousMetrics = await getFinancialMetrics(
        userId,
        prevMonth.from!,
        prevMonth.to!
    );

    const comparison = {
        incomeChange: calculatePercentageChange(
            previousMetrics.totalIncome,
            currentMetrics.totalIncome
        ),

        expenseChange: calculatePercentageChange(
            previousMetrics.totalExpense,
            currentMetrics.totalExpense
        ),

        savingsRateChange: Number((currentMetrics.savingsRate - previousMetrics.savingsRate).toFixed(2))
    };

    const categoryComparison = compareCategories(
        currentMetrics.categories,
        previousMetrics.categories
    );

    const topCategory = currentMetrics.categories[0];

    const topCategoryShare = currentMetrics.totalExpense > 0 ? (topCategory.amount / currentMetrics.totalExpense) * 100 : 0;

    const healthScore = calculateFinancialHealthScore({
        savingsRate: currentMetrics.savingsRate,
        balance: currentMetrics.balance,
        totalExpense: currentMetrics.totalExpense,
        transactionCount: currentMetrics.transactionCount,
        topCategoryShare,
    });

    const aiContext = {
        summary: {
            totalIncome: formatCurrency(currentMetrics.totalIncome),
            totalExpense: formatCurrency(currentMetrics.totalExpense),
            balance: formatCurrency(currentMetrics.balance),

            currentSavingsRate: currentMetrics.savingsRate,
            previousSavingsRate: previousMetrics.savingsRate,

            incomeChange: comparison.incomeChange,
            expenseChange: comparison.expenseChange,
            savingsRateDifference: comparison.savingsRateChange,

            transactionCount: currentMetrics.transactionCount,
        },

        topCategory: topCategory
            ? {
                name: topCategory._id,
                amount: formatCurrency(topCategory.amount),
                transactionCount: topCategory.count,
                expenseShare: Number(
                    (
                        (topCategory.amount /
                            currentMetrics.totalExpense) *
                        100
                    ).toFixed(2)
                ),
            }
            : null,

        categoryChanges: categoryComparison
            .filter(
                (cat) =>
                    cat.change === null ||
                    Math.abs(cat.change) >= 10
            )
            .map((cat) => ({
                category: cat.category,
                currentAmount: formatCurrency(cat.current),
                previousAmount: formatCurrency(cat.previous),
                percentageChange: cat.change,
            })),
    };

    const { insights, recommendations } = await generateFinancialInsightsAI(aiContext);


    if (insights.length > 0 && recommendations.length > 0 && healthScore) {
        await FinancialInsightModel.findOneAndUpdate(
            {
                userId,
                period,
            },
            {
                healthScore,
                insights,
                recommendations,
                generatedAt: new Date(),
            },
            {
                upsert: true,
            }
        );
    }

    return {
        healthScore,
        insights,
        recommendations
    }
}

async function generateFinancialInsightsAI(
    context: AIInsightsContext
) {
    try {
        const prompt = financialInsightsPrompt(context);

        const result = await genAI.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [createUserContent([prompt])],
            config: {
                responseMimeType: "application/json",
            },
        });

        const response = result.text;
        const cleanedText = response
            ?.replace(/```(?:json)?\n?/g, "")
            .trim();

        if (!cleanedText) {
            return {
                insights: [],
                recommendations: [],
            };
        }

        return JSON.parse(cleanedText);
    } catch (error) {
        console.error("AI Insights Error:", error);

        return {
            insights: [],
            recommendations: [],
        };
    }
}

async function getFinancialMetrics(
    userId: string,
    fromDate: Date,
    toDate: Date
) {
    const results = await TransactionModel.aggregate([
        {
            $match: {
                userId: new mongoose.Types.ObjectId(userId),
                date: {
                    $gte: fromDate,
                    $lte: toDate,
                },
            },
        },
        {
            $facet: {
                summary: [
                    {
                        $group: {
                            _id: null,
                            totalIncome: {
                                $sum: {
                                    $cond: [
                                        { $eq: ["$type", TransactionTypeEnum.INCOME] },
                                        { $abs: "$amount" },
                                        0,
                                    ],
                                },
                            },
                            totalExpense: {
                                $sum: {
                                    $cond: [
                                        { $eq: ["$type", TransactionTypeEnum.EXPENSE] },
                                        { $abs: "$amount" },
                                        0,
                                    ],
                                },
                            },
                            transactionCount: {
                                $sum: 1,
                            },
                        },
                    },
                ],

                categories: [
                    {
                        $match: {
                            type: TransactionTypeEnum.EXPENSE,
                        },
                    },
                    {
                        $group: {
                            _id: "$category",
                            amount: {
                                $sum: {
                                    $abs: "$amount",
                                },
                            },
                            count: {
                                $sum: 1,
                            },
                        },
                    },
                    {
                        $sort: {
                            amount: -1,
                        },
                    },
                ],
            },
        },

        {
            $project: {
                totalIncome: {
                    $ifNull: [
                        {
                            $arrayElemAt: ["$summary.totalIncome", 0],
                        },
                        0,
                    ],
                },

                totalExpense: {
                    $ifNull: [
                        {
                            $arrayElemAt: ["$summary.totalExpense", 0],
                        },
                        0,
                    ],
                },

                transactionCount: {
                    $ifNull: [
                        {
                            $arrayElemAt: ["$summary.transactionCount", 0],
                        },
                        0,
                    ],
                },

                categories: 1,
            },
        },
    ]);

    const metrics = results[0];

    const balance =
        metrics.totalIncome - metrics.totalExpense;

    const savingsRate = Number((metrics.totalIncome > 0 ? (balance / metrics.totalIncome) * 100 : 0).toFixed(2));

    return {
        totalIncome: metrics.totalIncome,
        totalExpense: metrics.totalExpense,
        balance,
        savingsRate,
        transactionCount: metrics.transactionCount,
        categories: metrics.categories,
    };
}

function compareCategories(
    currentCategories: any[],
    previousCategories: any[]
) {
    const previousMap = new Map(
        previousCategories.map((c) => [
            c._id,
            c.amount,
        ])
    );

    return currentCategories.map((current) => {
        const previousAmount =
            previousMap.get(current._id) || 0;

        return {
            category: current._id,
            current: current.amount,
            previous: previousAmount,
            change: previousAmount > 0 ?
                Number((((current.amount - previousAmount) / previousAmount) * 100).toFixed(1))
                : null,
        };
    });
}

function calculatePercentageChange(
    previous: number,
    current: number
): number | null {
    if (previous === 0) {
        return current === 0 ? 0 : null;
    }

    const percentage =
        ((current - previous) / previous) * 100;

    return Number(percentage.toFixed(2));
}