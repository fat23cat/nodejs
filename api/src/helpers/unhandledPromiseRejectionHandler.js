import { logger } from './logger';

export const unhandledPromiseRejectionHandler = () => {
  process.on('unhandledRejection', (reason, promise) => {
    logger.log({
      level: 'error',
      message: `Unhandled Rejection at: ${promise}. Reason: ${reason}`
    });
  });
};
