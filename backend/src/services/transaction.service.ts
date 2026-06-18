
import TransactionModel, { TransactionTypeEnum } from "../models/transaction.model";
import { calculateNextOccurance } from "../utils/helper";
import { CreateTransactionType, UpdateTransactionType } from "../validators/transaction.validator";
import { BadRequestException, NotFoundException } from "../utils/app-error";
import axios from "axios";
import { genAI, genAIModel } from "../config/google-ai.config";
import { createPartFromBase64, createUserContent } from "@google/genai";
import { receiptPrompt } from "../utils/prompt";

export const createTransactionService = async (body: CreateTransactionType, userId: string) => {
    // Service logic to create a transaction

    let nextRecurringDate: Date | undefined
    const currentDate = new Date();

    if (body.isRecurring && body.recurringInterval) {
        const calculatedDate = calculateNextOccurance(body.date, body.recurringInterval);
        nextRecurringDate = calculatedDate < currentDate ? calculateNextOccurance(currentDate, body.recurringInterval) : calculatedDate;
    }

    const transaction = await TransactionModel.create({
        ...body,
        userId,
        category: body.category,
        amount: Number(body.amount),
        isRecurring: body.isRecurring || false,
        recurringInterval: body.recurringInterval || null,
        nextRecurringDate,
        lastProcessed: null,
    });
    return transaction;
};

export const getAllTransactionService = async (
    userId: string,
    filters: {
        keyword?: string;
        type?: keyof typeof TransactionTypeEnum;
        recurringStatus?: "RECURRING" | "NON_RECURRING";
    },
    pagination: {
        pageSize: number;
        pageNumber: number;
    }
) => {
    const { keyword, type, recurringStatus } = filters;

    const filterConditions: Record<string, any> = {
        userId,
    };

    if (keyword) {
        filterConditions.$or = [
            { title: { $regex: keyword, $options: "i" } },
            { category: { $regex: keyword, $options: "i" } },
        ]
    }

    if (type) {
        filterConditions.type = type;
    }

    if (recurringStatus) {
        if (recurringStatus === "RECURRING") {
            filterConditions.isRecurring = true;
        } else if (recurringStatus === "NON_RECURRING") {
            filterConditions.isRecurring = false;
        }
    }

    const { pageSize, pageNumber } = pagination;
    const skip = (pageNumber - 1) * pageSize;

    const [transactions, totalCount] = await Promise.all([
        TransactionModel.find(filterConditions)
            .skip(skip)
            .limit(pageSize)
            .sort({ createdAt: -1 }),
        TransactionModel.countDocuments(filterConditions),
    ]);

    const totalPages = Math.ceil(totalCount / pageSize);

    return {
        transactions,
        pagination: {
            pageSize,
            pageNumber,
            totalCount,
            totalPages,
            skip,
        }
    }
};

export const getTransactionByIdService = async (userId: string, transactionId: string) => {
    const transaction = await TransactionModel.findOne({
        _id: transactionId,
        userId,
    });
    if (!transaction) throw new NotFoundException("Transaction Not Found");

    return transaction;
}

export const duplicateTransactionService = async (userId: string, transactionId: string) => {
    const transaction = await TransactionModel.findOne({
        _id: transactionId,
        userId,
    });
    if (!transaction) throw new NotFoundException("Transaction Not Found");

    const duplicated = await TransactionModel.create({
        ...transaction.toObject(),
        _id: undefined,
        title: `Duplicate - ${transaction.title}`,
        description: transaction.description ? `${transaction.description} (duplicate)` : "Duplicated Transaction",
        isRecurring: false,
        recurringInterval: undefined,
        nextRecurringDate: undefined,
        createdAt: undefined,
        updatedAt: undefined,
    })

    return duplicated;
};

export const updateTransactionService = async (userId: string, transactionId: string, body: UpdateTransactionType) => {
    const existingTransaction = await TransactionModel.findOne({
        _id: transactionId,
        userId,
    });
    if (!existingTransaction) throw new NotFoundException("Transaction Not Found");

    const now = new Date();
    const isRecurring = body.isRecurring ?? existingTransaction.isRecurring

    const date = body.date !== undefined ? new Date(body.date) : existingTransaction.date;

    const recurringInterval = body.recurringInterval || existingTransaction.recurringInterval;

    let nextRecurringDate: Date | undefined;

    if (isRecurring && recurringInterval) {
        const calculatedDate = calculateNextOccurance(date, recurringInterval);
        nextRecurringDate = calculatedDate < now ? calculateNextOccurance(now, recurringInterval) : calculatedDate;
    }

    existingTransaction.set({
        ... (body.title && { title: body.title }),
        ... (body.description && { description: body.description }),
        ... (body.category && { category: body.category }),
        ... (body.type && { type: body.type }),
        ... (body.paymentMethod && { paymentMethod: body.paymentMethod }),
        ... (body.amount !== undefined && { amount: Number(body.amount) }),
        date,
        isRecurring,
        recurringInterval,
        nextRecurringDate,
    });

    await existingTransaction.save();

    return;
};

export const deleteTransactionService = async (userId: string, transactionId: string) => {
    const deleted = await TransactionModel.findByIdAndDelete({
        _id: transactionId,
        userId,
    });
    if (!deleted) throw new NotFoundException("Transaction Not Found");

    return;
};

export const bulkDeleteTransactionService = async (userId: string, transactionIds: string[]) => {
    const result = await TransactionModel.deleteMany({
        _id: { $in: transactionIds },
        userId,
    });

    if (result.deletedCount === 0) throw new NotFoundException("No Transaction Found");

    return {
        success: true,
        deletedCount: result.deletedCount,
    };
}

export const bulkTransactionService = async (userId: string, transactions: CreateTransactionType[]) => {
    try {
        const bulkOps = transactions.map((tx) => ({
            insertOne: {
                document: {
                    ...tx,
                    userId,
                    isRecurring: false,
                    nextRecurringDate: null,
                    recurringInterval: null,
                    lastProcessed: null,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            },
        }));

        const result = await TransactionModel.bulkWrite(bulkOps, {
            ordered: true,
        });

        return {
            insertedCount: result.insertedCount,
            success: true,
        }
    } catch (error) {
        throw error;
    }
};

const generateReceiptContent = async (
    base64String: string,
    mimeType: string
) => {
    const request = (model: string) =>
        genAI.models.generateContent({
            model,
            contents: [
                createUserContent([
                    receiptPrompt,
                    createPartFromBase64(base64String, mimeType),
                ]),
            ],
            config: {
                temperature: 0,
                topP: 1,
                responseMimeType: "application/json",
            },
        });

    try {
        console.log("Trying Gemini 3.5 Flash...");

        return await request("gemini-3.5-flash");
    } catch (error: any) {
        console.log(error);
        const isUnavailable =
            error?.status === 503 ||
            error?.message?.includes("high demand") ||
            error?.message?.includes("UNAVAILABLE");

        if (!isUnavailable) {
            throw error;
        }

        console.log(
            "Gemini 3.5 unavailable. Falling back to Gemini 2.5 Flash..."
        );

        return await request("gemini-2.5-flash");
    }
};

export const scanReceiptService = async (file: Express.Multer.File | undefined) => {
    if (!file) throw new BadRequestException("No file uploaded");

    try {
        if (!file.path) throw new BadRequestException("failed to upload file");

        console.log(file.path);

        const responseData = await axios.get(file.path, {
            responseType: 'arraybuffer'
        });
        const base64String = Buffer.from(responseData.data).
            toString("base64");

        if (!base64String) throw new BadRequestException("Could not Process file");

        const result = await generateReceiptContent(
            base64String,
            file.mimetype
        );

        const response = result.text;
        const cleanedText = response?.replace(/```(?:json)?\n?/g, "").trim();

        if (!cleanedText) return { error: "Could notread receipt content" };

        const data = JSON.parse(cleanedText);

        if (!data.amount || !data.date) {
            return { error: "Receipt missing required information" };
        }

        return {
            title: data.title || "Receipt",
            amount: data.amount,
            date: data.date,
            description: data.description,
            category: data.category,
            paymentMethod: data.paymentMethod,
            type: data.type,
            receiptUrl: file.path,
        };
    } catch (error: any) {
        console.error("SCAN RECEIPT ERROR:");
        console.error(error);

        return {
            error: error?.message || "Receipt scanning service unavailable",
        };
    }
}