import mongoose from "mongoose";

export interface Insight {
    title: string;
    description: string;
}

export interface Recommendation {
    title: string;
    description: string;
}

export interface HealthScore {
    score: number;
    grade: string;
    breakdown: {
        savingHabits: number;
        cashFlow: number;
        spendingBalance: number;
        financialDiscipline: number;
    };
}

export interface FinancialInsightDocument extends mongoose.Document {
    userId: mongoose.Types.ObjectId;
    period: string;

    healthScore: HealthScore;

    insights: Insight[];
    recommendations: Recommendation[];

    generatedAt: Date;

    createdAt: Date;
    updatedAt: Date;
}

export enum FinancialGradeEnum {
    A_PLUS = "A+",
    A = "A",
    B = "B",
    C = "C",
    D = "D",
    F = "F",
}

const insightSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        _id: false,
    }
);

const recommendationSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        _id: false,
    }
);

const healthScoreSchema = new mongoose.Schema(
    {
        score: {
            type: Number,
            required: true,
        },
        grade: {
            type: String,
            required: true,
        },
        breakdown: {
            savingHabits: {
                type: Number,
                required: true,
            },
            cashFlow: {
                type: Number,
                required: true,
            },
            spendingBalance: {
                type: Number,
                required: true,
            },
            financialDiscipline: {
                type: Number,
                required: true,
            },
        },
    },
    {
        _id: false,
    }
);

const financialInsightSchema =
    new mongoose.Schema<FinancialInsightDocument>(
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "User",
            },

            period: {
                type: String,
                required: true,
                trim: true,
            },

            healthScore: {
                type: healthScoreSchema,
                required: true,
            },

            insights: {
                type: [insightSchema],
                required: true,
                default: [],
            },

            recommendations: {
                type: [recommendationSchema],
                required: true,
                default: [],
            },

            generatedAt: {
                type: Date,
                default: Date.now,
            },
        },
        {
            timestamps: true,
        }
    );

financialInsightSchema.index(
    {
        userId: 1,
        period: 1,
    },
    {
        unique: true,
    }
);

const FinancialInsightModel =
    mongoose.model<FinancialInsightDocument>(
        "FinancialInsight",
        financialInsightSchema
    );

export default FinancialInsightModel;