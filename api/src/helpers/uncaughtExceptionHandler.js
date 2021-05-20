import { logger } from './logger';

export const uncaughtExceptionHandler = () => {
  process.on('uncaughtException', (err, origin) => {
    logger.log({
      level: 'error',
      message: `Caught exception: ${err}. Exception origin: ${origin}`
    });
  });
};
