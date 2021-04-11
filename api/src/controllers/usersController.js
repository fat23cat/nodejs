import { nanoid } from 'nanoid';
import { data } from '../fakeData';
import {
  filterActiveUsers,
  sortUsersByLogin,
  createValidationErrorMessage,
  removeUsersPrivateData
} from '../helpers';
import { schema } from '../validation';

let users = data;

export function getAllUsers(req, res) {
  const { query = '', limit = 0 } = req.query;
  const activeUsers = filterActiveUsers(users);
  const suggestions = removeUsersPrivateData(activeUsers).filter((user) =>
    user.login.toLowerCase().startsWith(query.toLowerCase())
  );
  const actualLimit = limit ? limit : suggestions.length;
  res.status(200).json({
    totalSize: suggestions.length,
    limit: actualLimit,
    data: sortUsersByLogin(suggestions).slice(0, actualLimit)
  });
}

export function getUserById(req, res) {
  const userId = req.params.id;
  const activeUsers = filterActiveUsers(users);
  const payload = removeUsersPrivateData(activeUsers).find(
    (user) => user.id === userId
  );
  if (payload) {
    res.status(200).json(payload);
  } else {
    res.status(404).json({
      message: `User ID ${userId} does not exist`
    });
  }
}

export function createUser(req, res) {
  const validation = schema.validate(req.body);
  if (validation.error) {
    const message = createValidationErrorMessage(validation.error.details);
    res.status(400).json({
      message
    });
  }
  let newUser = {
    ...req.body,
    id: nanoid(3)
  };
  newUser = removeUsersPrivateData([newUser]);
  users.push(newUser);
  res.status(200).json(newUser);
}

export function partiallyUpdateUserById(req, res) {
  updateUser(req, res);
}

export function updateUserById(req, res) {
  const validation = schema.validate(req.body);
  if (validation.error) {
    const message = createValidationErrorMessage(validation.error.details);
    res.status(400).json({
      message
    });
  }
  updateUser(req, res);
}

export function deleteUserById(req, res) {
  const userId = req.params.id;
  const payload = filterActiveUsers(users).find((user) => user.id === userId);
  if (payload) {
    users = users.map((user) => {
      return user.id === userId ? { ...user, isDeleted: true } : user;
    });
    res.sendStatus(200);
  } else {
    res.status(404).json({
      message: `User ID ${userId} does not exist`
    });
  }
}

function updateUser(req, res) {
  const userId = req.params.id;
  const payload = filterActiveUsers(users).find((user) => user.id === userId);
  if (payload) {
    users = users.map((user) => {
      return user.id === userId ? { ...req.body, id: user.id } : user;
    });
    res.sendStatus(200);
  } else {
    res.status(404).json({
      message: `User ID ${userId} does not exist`
    });
  }
}
