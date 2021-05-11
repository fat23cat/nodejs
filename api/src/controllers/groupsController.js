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
  const group = await groupsService.getGroupById(groupId);
  if (group) {
    res.status(200).json(group);
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
  res.status(200).json(group);
};

export const updateGroupById = async (req, res) => {
  const { groupId } = req.params;
  let group = await groupsService.getGroupById(groupId);
  if (group) {
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
  if (!group) {
    return res.status(404).json({
      message: `Group id ${groupId} does not exist`
    });
  }
  const users = await group.getUsers();
  const usersIds = users.map(({ id: userId }) => userId);
  await group.removeUsers(usersIds);
  await groupsService.deleteGroup(groupId);
  res.sendStatus(200);
};
