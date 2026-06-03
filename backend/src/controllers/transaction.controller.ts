import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { HTTPSTATUS } from "../config/http.config";
import { createTransactionSchema, transactionIdSchema } from "../validators/transaction.validator";
import { createTransactionService, duplicateTransactionService, getAllTransactionService, getTransactionByIdService } from "../services/transaction.service";
import { TransactionTypeEnum } from "../models/transaction.model";


export const createTransactionController = asyncHandler(async (req: Request, res: Response) => {
    const body = createTransactionSchema.parse(req.body);
    const userId = req.user?._id;

    const transaction = await createTransactionService(body, userId);

    return res.status(HTTPSTATUS.CREATED).json({
        message: "Transaction created successfully",
        transaction,
    })
});

export const getAllTransactionController = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?._id;

    const filters = {
        keyword: req.query.keyword as string | undefined,
        type: req.query.type as keyof typeof TransactionTypeEnum | undefined,
        recurringStatus: req.query.recurringStatus as | "RECURRING" | "NON_RECURRING" | undefined,
    };
    const pagination = {
        pageSize: parseInt(req.query.pageSize as string) || 20,
        pageNumber: parseInt(req.query.pageNumber as string) || 1,
    };

    const result = await getAllTransactionService(userId, filters, pagination);

    return res.status(HTTPSTATUS.OK).json({
        message: "Transaction fetched Successfully",
        result,
    });
});

export const getTransactionByIdController = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const transactionId = transactionIdSchema.parse(req.params.id);

    const transaction = await getTransactionByIdService(userId, transactionId)

    return res.status(HTTPSTATUS.OK).json({
        message: "Transaction fetched Successfully",
        transaction

    })

});

export const duplicateTransactionController = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const transactionId = transactionIdSchema.parse(req.params.id);

    const transaction = await duplicateTransactionService(userId, transactionId)

    return res.status(HTTPSTATUS.OK).json({
        message: "Transaction duplicated Successfully",
        data: transaction,
    })

});