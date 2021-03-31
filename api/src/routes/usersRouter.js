import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  getUsersSuggestions
} from '../controllers';

const usersRouter = express.Router();

usersRouter.post('/', createUser);
usersRouter.get('/', getAllUsers);
usersRouter.get('/suggestions', getUsersSuggestions);
usersRouter.get('/:id', getUserById);
usersRouter.patch('/:id', updateUserById);
usersRouter.delete('/:id', deleteUserById);

export { usersRouter };
