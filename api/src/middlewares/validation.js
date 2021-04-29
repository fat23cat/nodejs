import { schema } from '../validation';
import { createValidationErrorMessage } from '../helpers';

export const validation = (req, res, next) => {
  const valid = schema.validate(req.body);
  if (valid) {
    return next();
  }
  const message = createValidationErrorMessage(valid.error.details);
  return res.status(400).json({
    message
  });
};
