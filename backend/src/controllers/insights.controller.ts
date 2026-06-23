import { asyncHandler } from "../middlewares/asyncHandler.middleware.js";
import { Request, Response } from "express";
import { HTTPSTATUS } from "../config/http.config.js";
import { getInsightsService } from "../services/insights.service.js";

export const getInsightsController = asyncHandler(
    async (req: Request, res: Response) => {
        const userId = req.user?._id;

        const insights = await getInsightsService(userId);

        return res.status(HTTPSTATUS.OK).json({
            message: "Insights fetched successfully",
            ...insights
        });
    }
);