export const user = {
  id: '1e8d50e5-a4a8-42d4-9f8b-4c5ad766320d',
  login: 'alex',
  age: 10
};

export const users = {
  totalSize: 1,
  limit: 1,
  users: [user]
};

export const updatedUser = {
  ...user,
  age: 100
};

export const userNotFoundMessage = {
  message: `User id ${user.id} does not exist`
};
