import express from 'express';
import {
  getAllGroups,
  getGroupById,
  createGroup,
  updateGroupById,
  deleteGroupById,
  addUsersToGroup
} from '../controllers';
import { groupValidation, userIdsValidation } from '../middlewares';

export const groupsRouter = express.Router();

groupsRouter.post('/', groupValidation, createGroup);
groupsRouter.get('/', getAllGroups);
groupsRouter.post('/:groupId', userIdsValidation, addUsersToGroup);
groupsRouter.get('/:groupId', getGroupById);
groupsRouter.put('/:groupId', groupValidation, updateGroupById);
groupsRouter.delete('/:groupId', deleteGroupById);
