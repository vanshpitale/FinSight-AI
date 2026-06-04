import { ZodError } from "zod";
import { ErrorRequestHandler } from "express";
import { HTTPSTATUS } from "../config/http.config";
import { AppError } from "../utils/app-error";
import { Response } from "express-serve-static-core";
import { ErrorCodeEnum } from "../enums/error-code.enum";
import { MulterError } from "multer";

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

const handleMulterError = (err: MulterError) => {
    const messages = {
        LIMIT_UNEXPECTED_FILE: "Invalid file field name. Please use 'file'",
        LIMIT_FILE_SIZE: "File size exceeds the limit",
        LIMIT_FILE_COUNT: "Too many files uploaded",
        default: "File upload error",
    };

    return {
        status: HTTPSTATUS.BAD_REQUEST,
        message: messages[err.code as keyof typeof messages] || messages.default,
        error: err.message
    }
}

export const errorHandler: ErrorRequestHandler = (err, req, res, next): any => {
    console.log("Error occurred on PATH:", req.path, "Error: ", err);

    if (err instanceof ZodError) {
        return formatZodError(res, err);
    }

    if (err instanceof MulterError) {
        const { status, message, error } = handleMulterError(err)
        return res.status(status).json({
            message,
            error,
            errorCode: ErrorCodeEnum.FILE_UPLOAD_ERROR,
        })
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