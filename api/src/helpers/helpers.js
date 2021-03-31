export function filterActiveUsers(users) {
  return users.filter((user) => !user.isDeleted);
}

export function sortUsersByLogin(users) {
  return users.sort((a, b) => {
    const loginA = a.login.toLowerCase();
    const loginB = b.login.toLowerCase();
    if (loginA < loginB) {
      return -1;
    }
    if (loginA > loginB) {
      return 1;
    }
    return 0;
  });
}

export function createValidationErrorMessage(errors) {
  return `These fields are missing: ${errors
    .map((err) => err.message)
    .join(', ')}`;
}
