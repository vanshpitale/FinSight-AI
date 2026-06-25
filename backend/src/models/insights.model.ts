import mongoose from "mongoose";

export interface Insight {
    title: string;
    description: string;
}

export interface Recommendation {
    title: string;
    description: string;
}

// Uncomment when you implement Financial Health Score
// export interface HealthScore {
//     score: number;
//     grade: string;
// }

export interface FinancialInsightDocument extends mongoose.Document {
    userId: mongoose.Types.ObjectId;
    period: string;

    // healthScore?: HealthScore;

    insights: Insight[];
    recommendations: Recommendation[];

    generatedAt: Date;

    createdAt: Date;
    updatedAt: Date;
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

            // Uncomment when implementing Financial Health Score
            // healthScore: {
            //     score: {
            //         type: Number,
            //         required: true,
            //     },
            //     grade: {
            //         type: String,
            //         required: true,
            //     },
            // },

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