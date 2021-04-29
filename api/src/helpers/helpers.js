import { customAlphabet } from 'nanoid';

export const generateUserId = customAlphabet('1234567890abcdef', 10);

export const createValidationErrorMessage = (errors) => {
  return `Validation failed: ${errors.map((err) => err.message).join(', ')}`;
};
