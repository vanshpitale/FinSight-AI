import { Request, Response } from "express";
import { HTTPSTATUS } from "../config/http.config";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { loginSchema, registerSchema } from "../validators/zod.validator";
import { loginService, registerService } from "../services/auth.service";


export const registerController = asyncHandler(
    async (req: Request, res: Response) => {
        // Registration logic here

        const body = registerSchema.parse(req.body);

        const result = await registerService(body);


        return res.status(HTTPSTATUS.CREATED).json({ message: "User registered successfully", data: result });
    }
);

export const loginController = asyncHandler(
    async (req: Request, res: Response) => {
        // Login logic here

        const body = loginSchema.parse({
            ...req.body,
        });

        const { user, accessToken, expiresAt, reportSetting } = await loginService(body);

        return res.status(HTTPSTATUS.OK).json({
            message: "User logged in successfully",
            user,
            accessToken,
            expiresAt,
            reportSetting
        });
    }
);