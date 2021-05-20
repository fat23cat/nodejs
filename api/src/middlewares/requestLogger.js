import { stringifyParams } from '../helpers';

const { stdout } = process;
const YELLOW = '\x1b[33m';
const CLOSE_COLOR = '\x1b[0m';

export const requestLogger = (req, res, next) => {
  const { method, query, path, body } = req;
  const queryParams = stringifyParams(query);
  const bodyParams = stringifyParams(body);
  stdout.write(
    `${YELLOW}[LOG] Request ${method} ${path}${
      queryParams ? `; query params: ${queryParams}` : ``
    }${bodyParams ? `; body params: ${bodyParams}` : ``}${CLOSE_COLOR}\n`
  );
  return next();
};
