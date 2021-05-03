export const createValidationErrorMessage = (errors) => {
  return `Validation failed: ${errors.map((err) => err.message).join(', ')}`;
};
