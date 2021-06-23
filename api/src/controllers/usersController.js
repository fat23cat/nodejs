import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { usersService } from '../services';
import { controllerLogger } from '../helpers';

const CONTROLLER_NAME = 'UsersController';

export const getAllUsers = async (req, res, next) => {
  try {
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
  } catch (err) {
    controllerLogger(CONTROLLER_NAME, 'getAllUsers', req, err);
    return next(err);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await usersService.getUserById(userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({
        message: `User id ${userId} does not exist`
      });
    }
  } catch (err) {
    controllerLogger(CONTROLLER_NAME, 'getUserById', req, err);
    return next(err);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const newUser = {
      ...req.body,
      id: uuidv4()
    };
    const result = await usersService.createUser(newUser);
    const user = await usersService.getUserById(result.id);
    res.status(200).json(user);
  } catch (err) {
    controllerLogger(CONTROLLER_NAME, 'createUser', req, err);
    return next(err);
  }
};
export const updateUserById = async (req, res, next) => {
  try {
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
      await usersService.updateUserById(user, userId);
      res.sendStatus(200);
    } else {
      res.status(404).json({
        message: `User id ${userId} does not exist`
      });
    }
  } catch (err) {
    controllerLogger(CONTROLLER_NAME, 'updateUserById', req, err);
    return next(err);
  }
};

export const deleteUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await usersService.getUserById(userId);
    if (user) {
      await usersService.deleteUserById(userId);
      res.sendStatus(200);
    } else {
      res.status(404).json({
        message: `User id ${userId} does not exist`
      });
    }
  } catch (err) {
    controllerLogger(CONTROLLER_NAME, 'deleteUserById', req, err);
    return next(err);
  }
};
