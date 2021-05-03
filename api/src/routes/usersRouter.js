import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById
} from '../controllers';
import { userValidation } from '../middlewares';

export const usersRouter = express.Router();

usersRouter.post('/', userValidation, createUser);
usersRouter.get('/', getAllUsers);
usersRouter.get('/:userId', getUserById);
usersRouter.put('/:userId', userValidation, updateUserById);
usersRouter.delete('/:userId', deleteUserById);
