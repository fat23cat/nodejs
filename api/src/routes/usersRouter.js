import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUsersSuggestions
} from '../controllers';

const usersRouter = express.Router();

usersRouter.post('/', createUser);
usersRouter.get('/', getAllUsers);
usersRouter.get('/suggestions', getUsersSuggestions);
usersRouter.get('/:id', getUserById);
usersRouter.patch('/:id', updateUser);
usersRouter.delete('/:id', deleteUser);

export { usersRouter };
