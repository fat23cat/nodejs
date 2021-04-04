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

export function getAllUsers(req, res, next) {
  const { query, limit } = req.query;
  if (query || limit) return next();
  const activeUsers = filterActiveUsers(users);
  const payload = removeUsersPrivateData(activeUsers);
  res.status(200).send(JSON.stringify(payload));
}

export function getUserById(req, res) {
  const userId = req.params.id;
  const activeUsers = filterActiveUsers(users);
  const payload = removeUsersPrivateData(activeUsers).find(
    (user) => user.id === userId
  );
  if (payload) {
    res.status(200).send(JSON.stringify(payload));
  } else {
    res.status(404).send({
      message: `User ID ${userId} does not exist`
    });
  }
}

export function createUser(req, res) {
  const validation = schema.validate(req.body);
  if (validation.error) {
    const message = createValidationErrorMessage(validation.error.details);
    res.status(400).send(
      JSON.stringify({
        message
      })
    );
  }
  const newUser = {
    ...req.body,
    id: nanoid(3)
  };
  users.push(newUser);
  res.status(200).send(JSON.stringify(newUser));
}

export function partiallyUpdateUserById(req, res) {
  updateUser(req, res);
}

export function updateUserById(req, res) {
  const validation = schema.validate(req.body);
  if (validation.error) {
    const message = createValidationErrorMessage(validation.error.details);
    res.status(400).send(
      JSON.stringify({
        message
      })
    );
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
    res.status(404).send({
      message: `User ID ${userId} does not exist`
    });
  }
}

export function getUsersSuggestions(req, res) {
  const { query = '', limit = 10 } = req.query;
  const activeUsers = filterActiveUsers(users);
  const suggestions = removeUsersPrivateData(activeUsers).filter((user) =>
    user.login.toLowerCase().startsWith(query.toLowerCase())
  );
  res.status(200).send(
    JSON.stringify({
      totalSize: suggestions.length,
      limit,
      suggestions: sortUsersByLogin(suggestions).slice(0, limit)
    })
  );
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
    res.status(404).send({
      message: `User ID ${userId} does not exist`
    });
  }
}
