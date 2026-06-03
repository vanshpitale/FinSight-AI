import { Router } from 'express';
import { getCurentUserController } from '../controllers/user.controller';
import { createTransactionController, getAllTransactionController, getTransactionByIdController } from '../controllers/transaction.controller';

const transactionRoutes = Router();

transactionRoutes.post('/create', createTransactionController);
transactionRoutes.get('/all', getAllTransactionController);
transactionRoutes.get('/:id', getTransactionByIdController);

export default transactionRoutes;