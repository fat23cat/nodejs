import express from 'express';
import {
  getAllGroups,
  getGroupById,
  createGroup,
  updateGroupById,
  deleteGroupById,
  addUsersToGroup
} from '../controllers';
import { groupValidation, usersIdsValidation } from '../middlewares';

export const groupsRouter = express.Router();

groupsRouter.post('/', groupValidation, createGroup);
groupsRouter.get('/', getAllGroups);
groupsRouter.get('/:groupId', getGroupById);
groupsRouter.put('/:groupId', groupValidation, updateGroupById);
groupsRouter.delete('/:groupId', deleteGroupById);
groupsRouter.post('/:groupId/users', usersIdsValidation, addUsersToGroup);
