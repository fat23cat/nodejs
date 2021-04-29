import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById
} from '../controllers';

export const usersRouter = express.Router();

usersRouter.post('/', createUser);
usersRouter.get('/', getAllUsers);
usersRouter.get('/:userId', getUserById);
usersRouter.put('/:userId', updateUserById);
usersRouter.delete('/:userId', deleteUserById);
