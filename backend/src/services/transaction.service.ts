import { tr } from "zod/v4/locales";
import TransactionModel from "../models/transaction.model";
import { calculateNextOccurance } from "../utils/helper";
import { CreateTransactionType } from "../validators/transaction.validator";

export const createTransactionService = async (body: CreateTransactionType, userId: string) => {
    // Service logic to create a transaction

    let nextRecurringDate: Date | undefined
    const currentDate = new Date();

    if(body.isRecurring && body.recurringInterval) {
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
