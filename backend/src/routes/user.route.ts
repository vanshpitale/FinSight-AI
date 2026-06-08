import { Router } from 'express';
import { getCurentUserController, updateUserController } from '../controllers/user.controller';
import { upload } from '../config/cloudinary.config';

const userRoutes = Router();

userRoutes.get('/current-user', getCurentUserController);
userRoutes.put('/update', upload.single('profilePicture'), updateUserController);


export default userRoutes;