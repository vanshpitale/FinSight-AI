import mongoose, { PipelineStage } from "mongoose";
import { DateRangeEnum, DateRangePreset } from "../enums/date-range.enum"
import { getDateRange } from "../utils/date";
import TransactionModel, { TransactionTypeEnum } from "../models/transaction.model";
import { differenceInDays, subDays, subYears } from "date-fns";

export const summaryAnalyticsService = async (
    userId: string,
    dateRangePreset?: DateRangePreset,
    customFrom?: Date,
    customTo?: Date,
) => {
    const range = getDateRange(dateRangePreset, customFrom, customTo);
    const { from, to, value: rangeValue } = range;

    const currentPeriodPipeline: PipelineStage[] = [
        {
            $match: {
                userId: new mongoose.Types.ObjectId(userId),
                ...(from && to && {
                    date: {
                        $gte: from,
                        $lte: to,
                    },
                }),
            },
        },
        {
            $group: {
                _id: null,
                totalIncome: {
                    $sum: {
                        $cond: [
                            { $eq: ['$type', TransactionTypeEnum.INCOME] },
                            { $abs: "$amount" },
                            0,
                        ],
                    },
                },
                totalExpense: {
                    $sum: {
                        $cond: [
                            { $eq: ['$type', TransactionTypeEnum.EXPENSE] },
                            { $abs: "$amount" },
                            0,
                        ],
                    },
                },
                transactionCount: { $sum: 1 },
            },
        },
        {
            $project: {
                _id: 0,
                totalIncome: 1,
                totalExpense: 1,
                transactionCount: 1,

                availableBalance: { $subtract: ["$totalIncome", "$totalExpense"] },

                savingsData: {
                    $let: {
                        vars: {
                            income: { $ifNull: ["$totalIncome", 0] },
                            expense: { $ifNull: ["$totalExpense", 0] },
                        },
                        in: {
                            // const savingRate = ((totalIncome - totalExpense) / totalIncome) * 100;
                            savingsPercentage: {
                                $cond: [
                                    { $lte: ["$$income", 0] },
                                    0,
                                    {
                                        $multiply: [
                                            {
                                                $divide: [
                                                    {
                                                        $subtract: ["$$income", "$$expense"],
                                                    },
                                                    "$$income",
                                                ],
                                            },
                                            100,
                                        ],
                                    },
                                ],
                            },

                            // Expense Ratio = (expenses / income) * 100
                            expenseRatio: {
                                $cond: [
                                    { $lte: ["$$income", 0] },
                                    0,
                                    {
                                        $multiply: [
                                            {
                                                $divide: ["$$expense", "$$income"],
                                            },
                                            100,
                                        ],
                                    },
                                ],
                            },
                        },
                    },
                },
            },
        },
    ];

    const [current] = await TransactionModel.aggregate(currentPeriodPipeline);
    const {
        totalIncome = 0,
        totalExpense = 0,
        availableBalance = 0,
        transactionCount = 0,
        savingsData = {
            expenseRatio: 0,
            savingsPercentage: 0,
        },
    } = current || {};

    let percentageChange: any = {
        income: 0,
        expense: 0,
        balance: 0,
        prevPeriodFrom: null,
        prevPeriodTo: null,
        previousValues: {
            incomeAmount: 0,
            expenseAmount: 0,
            balanceAmount: 0,
        },
    };

    if (from && to && rangeValue !== DateRangeEnum.ALL_TIME) {
        //last 30 days  previous las 30 days,

        const period = differenceInDays(to, from) + 1;

        const isYearly = [
            DateRangeEnum.LAST_YEAR,
            DateRangeEnum.THIS_YEAR,
        ].includes(rangeValue);

        const prevPeriodFrom = isYearly ? subYears(from, 1) : subDays(from, period);

        const prevPeriodTo = isYearly ? subYears(to, 1) : subDays(to, period);

        const prevPeriodPipeline = [
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(userId),
                    date: {
                        $gte: prevPeriodFrom,
                        $lte: prevPeriodTo,
                    },
                },
            },
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
                },
            },
        ];

        const [previous] = await TransactionModel.aggregate(prevPeriodPipeline);

        if (previous) {
            const prevIncome = previous.totalIncome || 0;
            const prevExpense = previous.totalExpense || 0;
            const prevBalance = prevIncome - prevExpense;

            const currentIncome = totalIncome;
            const currentExpense = totalExpense;
            const currentBalance = availableBalance;

            percentageChange = {
                income: calaulatePercentageChange(prevIncome, currentIncome),
                expense: calaulatePercentageChange(prevExpense, currentExpense),
                balance: calaulatePercentageChange(prevBalance, currentBalance),
                prevPeriodFrom: prevPeriodFrom,
                prevPeriodTo: prevPeriodTo,
                previousValues: {
                    incomeAmount: prevIncome,
                    expenseAmount: prevExpense,
                    balanceAmount: prevBalance,
                },
            };
        }
    }

    return {
        availableBalance: availableBalance,
        totalIncome: totalIncome,
        totalExpense: totalExpense,
        savingRate: {
            percentage: parseFloat(savingsData.savingsPercentage.toFixed(2)),
            expenseRatio: parseFloat(savingsData.expenseRatio.toFixed(2)),
        },
        transactionCount,
        percentageChange: {
            ...percentageChange,
            previousValues: {
                incomeAmount: percentageChange.previousValues.incomeAmount,
                expenseAmount: percentageChange.previousValues.expenseAmount,
                balanceAmount: percentageChange.previousValues.balanceAmount,
            },
        },
        preset: {
            ...range,
            value: rangeValue || DateRangeEnum.ALL_TIME,
            label: range?.label || "All Time",
        },
    };
};

export const chartAnalyticsServive = async (
    userId: string,
    dateRangePreset?: DateRangePreset,
    customFrom?: Date,
    customTo?: Date,
) => {
    const range = getDateRange(dateRangePreset, customFrom, customTo);
    const { from, to, value: rangeValue } = range;

    const filter: any = {
        userId: new mongoose.Types.ObjectId(userId),
        ...(from && to && {
            date: {
                $gte: from,
                $lte: to,
            },
        }),
    };

    const result = await TransactionModel.aggregate([
        { $match: filter },

        {
            $group: {
                _id: {
                    $dateToString: {
                        format: "%Y-%m-%d",
                        date: "$date",
                    },
                },

                income: {
                    $sum: {
                        $cond: [
                            { $eq: ["$type", TransactionTypeEnum.INCOME] },
                            { $abs: "$amount" },
                            0,
                        ],
                    },
                },

                expense: {
                    $sum: {
                        $cond: [
                            { $eq: ["$type", TransactionTypeEnum.EXPENSE] },
                            { $abs: "$amount" },
                            0,
                        ],
                    },
                },

                incomeCount: {
                    $sum: {
                        $cond: [
                            { $eq: ["$type", TransactionTypeEnum.INCOME] },
                            1,
                            0,
                        ],
                    },
                },

                expenseCount: {
                    $sum: {
                        $cond: [
                            { $eq: ["$type", TransactionTypeEnum.EXPENSE] },
                            1,
                            0,
                        ],
                    },
                },
            },
        },

        { $sort: { _id: 1 } },

        {
            $project: {
                _id: 0,
                date: "$_id",
                income: 1,
                expense: 1,
                incomeCount: 1,
                expenseCount: 1,
            },
        },

        {
            $group: {
                _id: null,
                chartData: { $push: "$$ROOT" },
                totalIncomeCount: { $sum: "$incomeCount" },
                totalExpenseCount: { $sum: "$expenseCount" },
            },
        },

        {
            $project: {
                _id: 0,
                chartData: 1,
                totalIncomeCount: 1,
                totalExpenseCount: 1,
            },
        },
    ]);

    const resultData = result[0] || {};

    const transformedData = (resultData.chartData || [])
        .map((item: any) => ({
            date: item.date,
            income: item.income,
            expense: item.expense,
        }));

    return {
        chartData: transformedData,
        totalIncomeCount: resultData.totalIncomeCount,
        totalExpenseCount: resultData.totalExpenseCount,
        preset: {
            ...range,
            value: rangeValue || DateRangeEnum.ALL_TIME,
            label: range?.label || "All Time",
        },
    };
};

export const expensePieChartBreakdownService = async (
    userId: string,
    dateRangePreset?: DateRangePreset,
    customFrom?: Date,
    customTo?: Date,
) => {
    const range = getDateRange(dateRangePreset, customFrom, customTo);
    const { from, to, value: rangeValue } = range;

    const filter: any = {
        userId: new mongoose.Types.ObjectId(userId),
        type: TransactionTypeEnum.EXPENSE,
        ...(from && to && {
            date: {
                $gte: from,
                $lte: to,
            },
        }),
    };

    const pipeline: PipelineStage[] = [
        {
            $match: filter,
        },
        {
            $group: {
                _id: "$category",
                value: { $sum: { $abs: "$amount" } },
            },
        },
        { $sort: { value: -1 } },

        {
            $facet: {
                topThree: [{ $limit: 3 }],
                others: [
                    { $skip: 3 },
                    {
                        $group: {
                            _id: "others",
                            value: { $sum: "$value" },
                        },
                    },
                ],
            },
        },

        {
            $project: {
                categories: {
                    $concatArrays: ["$topThree", "$others"],
                },
            },
        },

        { $unwind: "$categories" },

        {
            $group: {
                _id: null,
                totalSpent: { $sum: "$categories.value" },
                breakdown: { $push: "$categories" },
            },
        },

        {
            $project: {
                _id: 0,
                totalSpent: 1,
                breakdown: {
                    // .map((cat: any)=> )
                    $map: {
                        input: "$breakdown",
                        as: "cat",
                        in: {
                            name: "$$cat._id",
                            value: "$$cat.value",
                            percentage: {
                                $cond: [
                                    { $eq: ["$totalSpent", 0] },
                                    0,
                                    {
                                        $round: [
                                            {
                                                $multiply: [
                                                    { $divide: ["$$cat.value", "$totalSpent"] },
                                                    100,
                                                ],
                                            },
                                            0,
                                        ],
                                    },
                                ],
                            },
                        },
                    },
                },
            },
        },
    ];

    const result = await TransactionModel.aggregate(pipeline);

    const data = result[0] || {
        totalSpent: 0,
        breakdown: [],
    };
    const transformedData = {
        totalSpent: data.totalSpent,
        breakdown: data.breakdown.map((item: any) => ({
            ...item,
            value: item.value,
        })),
    };

    return {
        ...transformedData,
        preset: {
            ...range,
            value: rangeValue || DateRangeEnum.ALL_TIME,
            label: range?.label || "All Time",
        },
    };
}

function calaulatePercentageChange(previous: number, current: number) {
    if (previous === 0) return current === 0 ? 0 : 100;
    const changes = ((current - previous) / Math.abs(previous)) * 100;
    const cappedChange = Math.min(Math.max(changes, -100), 100);
    return parseFloat(cappedChange.toFixed(2));
}