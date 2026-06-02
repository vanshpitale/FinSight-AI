import { Router } from 'express';
import { getCurentUserController } from '../controllers/user.controller';

const userRoutes = Router();

userRoutes.get('/current-user', getCurentUserController);

export default userRoutes;