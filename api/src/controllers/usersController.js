import { nanoid } from 'nanoid';
import { data } from '../fakeData';
import { filterActiveUsers } from '../helpers';

let users = data;

export function getUsers(req, res) {
  const payload = users?.length ? filterActiveUsers(users) : [];
  res.status(200).send(JSON.stringify(payload));
}

export function getUserById(req, res) {
  const userId = req.params.id;
  const payload = users.find((user) => user.id === userId);
  if (!payload?.isDeleted) {
    res.status(200).send(JSON.stringify(payload));
  } else {
    res.status(404).send({
      message: `User ID ${userId} does not exist`
    });
  }
}

export function createUser(req, res) {
  const newUser = {
    id: nanoid(3),
    isDeleted: false,
    ...req.body
  };
  users.push(newUser);
  res.status(200).send(JSON.stringify(newUser));
}

export function updateUser(req, res) {
  const userId = req.params.id;
  const payload = users.find((user) => user.id === userId);
  if (!payload?.isDeleted) {
    users = users.map((user) => {
      return user.id === userId ? { ...user, ...req.body } : user;
    });
    res.sendStatus(200);
  } else {
    res.status(404).send({
      message: `User ID ${userId} does not exist`
    });
  }
}

export function deleteUser(req, res) {
  const userId = req.params.id;
  const payload = users.find((user) => user.id === userId);
  if (!payload?.isDeleted) {
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
  const suggestions = users
    .filter((user) => user.login.toLowerCase().startsWith(query.toLowerCase()))
    .slice(0, limit);
  const payload = suggestions.length ? filterActiveUsers(suggestions) : [];
  res.status(200).send(
    JSON.stringify({
      totalSize: payload.length,
      limit,
      suggestions: payload
    })
  );
}
