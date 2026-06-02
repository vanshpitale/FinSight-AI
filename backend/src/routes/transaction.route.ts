import { Router } from 'express';
import { getCurentUserController } from '../controllers/user.controller';
import { createTransactionController } from '../controllers/transaction.controller';

const transactionRoutes = Router();

transactionRoutes.post('/create', createTransactionController);

export default transactionRoutes;