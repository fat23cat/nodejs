import { createValidationErrorMessage, generateUserId } from '../helpers';
import { schema } from '../validation';
import { UsersService } from '../services';

const usersService = new UsersService();

export async function getAllUsers(req, res) {
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
}

export async function getUserById(req, res) {
  const { userId } = req.params;
  const result = await usersService.getUserById(userId);
  if (result[0]) {
    res.status(200).json(result[0]);
  } else {
    res.status(404).json({
      message: `User id ${userId} does not exist`
    });
  }
}

export async function createUser(req, res) {
  const validation = schema.validate(req.body);
  if (validation.error) {
    const message = createValidationErrorMessage(validation.error.details);
    return res.status(400).json({
      message
    });
  }
  const newUser = {
    ...req.body,
    id: generateUserId()
  };
  const result = await usersService.createUser(newUser);
  const user = await usersService.getUserById(result.id);
  res.status(200).json(user[0]);
}
export async function updateUserById(req, res) {
  const validation = schema.validate(req.body);
  if (validation.error) {
    const message = createValidationErrorMessage(validation.error.details);
    return res.status(400).json({
      message
    });
  }
  const { userId } = req.params;
  let user = await usersService.getUserById(userId);
  if (user[0]) {
    user = {
      ...user,
      login: req.body.login,
      password: req.body.password,
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
}

export async function deleteUserById(req, res) {
  const { userId } = req.params;
  const user = await usersService.getUserById(userId);
  if (user[0]) {
    await usersService.deleteUser(userId);
    res.sendStatus(200);
  } else {
    res.status(404).json({
      message: `User id ${userId} does not exist`
    });
  }
}
