import express from 'express';
import {
  getAllGroups,
  getGroupById,
  createGroup,
  updateGroupById,
  deleteGroupById
} from '../controllers';
import { groupValidation } from '../middlewares';

export const groupsRouter = express.Router();

groupsRouter.post('/', groupValidation, createGroup);
groupsRouter.get('/', getAllGroups);
groupsRouter.get('/:groupId', getGroupById);
groupsRouter.put('/:groupId', groupValidation, updateGroupById);
groupsRouter.delete('/:groupId', deleteGroupById);
