import express from 'express';
import { callUserDetails, login, logout, signup } from '../controllers/user_controllers.js';
import { Authenticate } from '../middlewares/auth.js';
const userRouter = express.Router();

userRouter.post('/register', signup);
userRouter.post('/login',login);
userRouter.get('/logout',logout);
userRouter.get('/getUserData',Authenticate,callUserDetails);

export default userRouter;