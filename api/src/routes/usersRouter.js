import express from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUsersSuggestions
} from '../controllers';

const usersRouter = express.Router();

usersRouter.get('/', getUsers);
usersRouter.get('/:id', getUserById);
usersRouter.get('/suggestions', getUsersSuggestions);
usersRouter.post('/', createUser);
usersRouter.put('/', updateUser);
usersRouter.delete('/', deleteUser);

export { usersRouter };
