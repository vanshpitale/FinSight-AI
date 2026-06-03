import { Router } from 'express';
import { getCurentUserController } from '../controllers/user.controller';
import { createTransactionController, duplicateTransactionController, getAllTransactionController, getTransactionByIdController, updateTransactionController } from '../controllers/transaction.controller';

const transactionRoutes = Router();

transactionRoutes.post('/create', createTransactionController);
transactionRoutes.put('/duplicate/:id', duplicateTransactionController);
transactionRoutes.put('/update/:id', updateTransactionController);

transactionRoutes.get('/all', getAllTransactionController);
transactionRoutes.get('/:id', getTransactionByIdController);

export default transactionRoutes;