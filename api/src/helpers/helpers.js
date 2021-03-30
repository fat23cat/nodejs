export function filterActiveUsers(users) {
  return users.filter((user) => !user.isDeleted);
}

export function createValidationErrorMessage(errors) {
  return `These fields are missing: ${errors
    .map((err) => err.message)
    .join(', ')}`;
}
