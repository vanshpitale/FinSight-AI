import { ZodError } from "zod";
import { ErrorRequestHandler } from "express";
import { HTTPSTATUS } from "../config/http.config";
import { AppError } from "../utils/app-error";
import { Response } from "express-serve-static-core";
import { ErrorCodeEnum } from "../enums/error-code.enum";

const formatZodError = (res: Response, err: ZodError) => {
    const errors = err?.issues?.map(error => ({
        field: error.path.join("."),
        message: error.message
    }));
    return res.status(HTTPSTATUS.BAD_REQUEST).json({
        message: "Validation failed",
        errors: errors,
        errorCode: ErrorCodeEnum.VALIDATION_ERROR,
    });
}

export const errorHandler: ErrorRequestHandler = (err, req, res, next): any => {
    console.log("Error occurred on PATH:", req.path, "Error: ", err);

    if( err instanceof ZodError ) {
        return formatZodError(res, err);
    }

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            message: err.message,
            errorCode: err.errorCode
        });
    }

    return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
        message: "Internal Server Error",
        error: err?.message || "An unexpected error occurred",
    });
};