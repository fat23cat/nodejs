import { v4 as uuidv4 } from 'uuid';
import { GroupsService } from '../services';

const groupsService = new GroupsService();

export const getAllGroups = async (req, res) => {
  const result = await groupsService.getAllGroups();
  res.status(200).json({
    groups: result
  });
};

export const getGroupById = async (req, res) => {
  const { groupId } = req.params;
  const result = await groupsService.getGroupById(groupId);
  if (result[0]) {
    res.status(200).json(result[0]);
  } else {
    res.status(404).json({
      message: `Group id ${groupId} does not exist`
    });
  }
};

export const createGroup = async (req, res) => {
  const newGroup = {
    ...req.body,
    id: uuidv4()
  };
  const result = await groupsService.createGroup(newGroup);
  const group = await groupsService.getGroupById(result.id);
  res.status(200).json(group[0]);
};

export const updateGroupById = async (req, res) => {
  const { groupId } = req.params;
  let group = await groupsService.getGroupById(groupId);
  if (group[0]) {
    group = {
      ...group,
      name: req.body.name,
      permissions: req.body.permissions
    };
    await groupsService.updateGroup(group, groupId);
    res.sendStatus(200);
  } else {
    res.status(404).json({
      message: `Group id ${groupId} does not exist`
    });
  }
};

export const deleteGroupById = async (req, res) => {
  const { groupId } = req.params;
  const group = await groupsService.getGroupById(groupId);
  if (group[0]) {
    await groupsService.deleteGroup(groupId);
    res.sendStatus(200);
  } else {
    res.status(404).json({
      message: `Group id ${groupId} does not exist`
    });
  }
};

export const addUsersToGroup = async (req, res) => {
  const { groupId } = req.params;
  res.status(200).json({
    groupId,
    userIds: req.body.userIds
  });
};
