import { schema } from '../validation';
import { createValidationErrorMessage } from '../helpers';

export const validation = (req, res, next) => {
  const validationResult = schema.validate(req.body);
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
