import { Router } from 'express';
import { getCurentUserController } from '../controllers/user.controller';
import { createTransactionController, duplicateTransactionController, getAllTransactionController, getTransactionByIdController } from '../controllers/transaction.controller';

const transactionRoutes = Router();

transactionRoutes.post('/create', createTransactionController);
transactionRoutes.put('/duplicate/:id', duplicateTransactionController);

transactionRoutes.get('/all', getAllTransactionController);
transactionRoutes.get('/:id', getTransactionByIdController);

export default transactionRoutes;