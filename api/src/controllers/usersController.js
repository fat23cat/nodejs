export function getUsers(request, response) {
  response.send('get users');
}

export function getUserById(request, response) {
  response.send('get user by id');
}

export function createUser(request, response) {
  response.send('create user');
}

export function updateUser(request, response) {
  response.send('update user');
}

export function deleteUser(request, response) {
  response.send('delete user');
}

export function getUsersSuggestions(request, response) {
  response.send('get suggestions');
}
