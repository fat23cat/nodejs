import { logger } from './logger';
import { stringifyParams } from '../helpers';
export const controllerLogger = (name, method, req, err) => {
  const { query, body } = req;
  const queryParams = stringifyParams(query);
  const bodyParams = stringifyParams(body);
  logger.log({
    level: 'error',
    message: `Controller: ${name}; Method: ${method}${
      queryParams ? `; query params: ${queryParams}` : ``
    }${bodyParams ? `; body params: ${bodyParams}` : ``}; Error: ${err}`
  });
};
