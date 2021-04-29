import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById
} from '../controllers';
import { validation } from '../middlewares';

export const usersRouter = express.Router();

usersRouter.post('/', validation, createUser);
usersRouter.get('/', getAllUsers);
usersRouter.get('/:userId', getUserById);
usersRouter.put('/:userId', validation, updateUserById);
usersRouter.delete('/:userId', deleteUserById);
