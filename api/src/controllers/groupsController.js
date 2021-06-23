import { v4 as uuidv4 } from 'uuid';
import { groupsService } from '../services';
import { controllerLogger } from '../helpers';

const CONTROLLER_NAME = 'GroupsController';

export const getAllGroups = async (req, res, next) => {
  try {
    const result = await groupsService.getAllGroups();
    res.status(200).json({
      groups: result
    });
  } catch (err) {
    controllerLogger(CONTROLLER_NAME, 'getAllGroups', req, err);
    return next(err);
  }
};

export const getGroupById = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const group = await groupsService.getGroupById(groupId);
    if (group) {
      res.status(200).json(group);
    } else {
      res.status(404).json({
        message: `Group id ${groupId} does not exist`
      });
    }
  } catch (err) {
    controllerLogger(CONTROLLER_NAME, 'getGroupById', req, err);
    return next(err);
  }
};

export const createGroup = async (req, res, next) => {
  try {
    const newGroup = {
      ...req.body,
      id: uuidv4()
    };
    const result = await groupsService.createGroup(newGroup);
    const group = await groupsService.getGroupById(result.id);
    res.status(200).json(group);
  } catch (err) {
    controllerLogger(CONTROLLER_NAME, 'createGroup', req, err);
    return next(err);
  }
};

export const updateGroupById = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    let group = await groupsService.getGroupById(groupId);
    if (group) {
      group = {
        ...group,
        name: req.body.name,
        permissions: req.body.permissions
      };
      await groupsService.updateGroupById(group, groupId);
      res.sendStatus(200);
    } else {
      res.status(404).json({
        message: `Group id ${groupId} does not exist`
      });
    }
  } catch (err) {
    controllerLogger(CONTROLLER_NAME, 'updateGroupById', req, err);
    return next(err);
  }
};

export const deleteGroupById = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const group = await groupsService.getGroupById(groupId);
    if (group) {
      await groupsService.deleteGroupById(groupId);
      res.sendStatus(200);
    } else {
      res.status(404).json({
        message: `Group id ${groupId} does not exist`
      });
    }
  } catch (err) {
    controllerLogger(CONTROLLER_NAME, 'deleteGroupById', req, err);
    return next(err);
  }
};

export const addUsersToGroup = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const { usersIds } = req.body;
    await groupsService
      .addUsersToGroup(groupId, usersIds)
      .then(() => {
        return res.sendStatus(200);
      })
      .catch(() => {
        return res.status(500).json({
          message: 'Server error'
        });
      });
  } catch (err) {
    controllerLogger(CONTROLLER_NAME, 'addUsersToGroup', req, err);
    return next(err);
  }
};
