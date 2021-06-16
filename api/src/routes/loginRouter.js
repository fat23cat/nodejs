import express from 'express';
import { logIn } from '../controllers';
import { loginValidation } from '../middlewares';

export const loginRouter = express.Router();

loginRouter.post('/', loginValidation, logIn);
