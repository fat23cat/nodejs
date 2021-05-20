import { logger } from '../helpers';

export const unhandledErrorLogger = (err, req, res, next) => {
  if (err) {
    logger.log({
      level: 'error',
      message: err.stack
    });
    return res.status(500).json({
      message: 'Internal server error'
    });
  }
  return next();
};
