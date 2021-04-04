import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  getUsersSuggestions,
  partiallyUpdateUserById
} from '../controllers';

const usersRouter = express.Router();

usersRouter.post('/', createUser);
usersRouter.get('/', getAllUsers);
usersRouter.get('/', getUsersSuggestions);
usersRouter.get('/:id', getUserById);
usersRouter.put('/:id', updateUserById);
usersRouter.patch('/:id', partiallyUpdateUserById);
usersRouter.delete('/:id', deleteUserById);

export { usersRouter };
