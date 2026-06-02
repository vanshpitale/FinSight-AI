import { Request, Response } from "express";
import { HTTPSTATUS } from "../config/http.config";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { registerSchema } from "../validators/zod.validator";
import { registerService } from "../services/auth.service";


export const registerController = asyncHandler(
    async (req: Request, res: Response) => {
        // Registration logic here

        const body = registerSchema.parse(req.body);

        const result = await registerService(body);


        return res.status(HTTPSTATUS.CREATED).json({ message: "User registered successfully", data: result });
    }
);