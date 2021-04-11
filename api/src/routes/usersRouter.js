import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  partiallyUpdateUserById
} from '../controllers';

const usersRouter = express.Router();

usersRouter.post('/', createUser);
usersRouter.get('/', getAllUsers);
usersRouter.get('/:id', getUserById);
usersRouter.put('/:id', updateUserById);
usersRouter.patch('/:id', partiallyUpdateUserById);
usersRouter.delete('/:id', deleteUserById);

export { usersRouter };
