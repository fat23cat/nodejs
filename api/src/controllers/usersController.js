import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { usersService } from '../services';

export const getAllUsers = async (req, res) => {
  const { query, limit } = req.query;
  let result;
  if (query) {
    result = await usersService.getAllUsersSuggestions(query, limit);
  } else {
    result = await usersService.getAllUsers();
  }
  const actualLimit = limit ? limit : result.length;
  res.status(200).json({
    totalSize: result.length,
    limit: actualLimit,
    users: result.slice(0, actualLimit)
  });
};

export const getUserById = async (req, res) => {
  const { userId } = req.params;
  const user = await usersService.getUserById(userId);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({
      message: `User id ${userId} does not exist`
    });
  }
};

export const createUser = async (req, res) => {
  const newUser = {
    ...req.body,
    id: uuidv4()
  };
  const result = await usersService.createUser(newUser);
  const user = await usersService.getUserById(result.id);
  res.status(200).json(user);
};
export const updateUserById = async (req, res) => {
  const { userId } = req.params;
  let user = await usersService.getUserById(userId);
  if (user) {
    user = {
      ...user,
      login: req.body.login,
      password: await bcrypt.hash(req.body.password, 10),
      age: req.body.age,
      isDeleted: false
    };
    await usersService.updateUser(user, userId);
    res.sendStatus(200);
  } else {
    res.status(404).json({
      message: `User id ${userId} does not exist`
    });
  }
};

export const deleteUserById = async (req, res) => {
  const { userId } = req.params;
  const user = await usersService.getUserById(userId);
  if (user) {
    await usersService.deleteUser(userId);
    res.sendStatus(200);
  } else {
    res.status(404).json({
      message: `User id ${userId} does not exist`
    });
  }
};
