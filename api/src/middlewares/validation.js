import {
  userSchema,
  groupSchema,
  usersIdsSchema,
  loginSchema
} from '../validation';
import { createValidationErrorMessage } from '../helpers';

export const userValidation = (req, res, next) => {
  const validationResult = userSchema.validate(req.body);
  validate(validationResult, res, next);
};

export const groupValidation = (req, res, next) => {
  const validationResult = groupSchema.validate(req.body);
  validate(validationResult, res, next);
};

export const usersIdsValidation = (req, res, next) => {
  const validationResult = usersIdsSchema.validate(req.body);
  validate(validationResult, res, next);
};
export const loginValidation = (req, res, next) => {
  const validationResult = loginSchema.validate(req.body);
  validate(validationResult, res, next);
};

const validate = (validationResult, res, next) => {
  if (validationResult.error) {
    const message = createValidationErrorMessage(
      validationResult.error.details
    );
    return res.status(400).json({
      message
    });
  }
  return next();
};
