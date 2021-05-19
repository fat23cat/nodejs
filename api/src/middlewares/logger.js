const { stdout } = process;
const YELLOW = '\x1b[33m';
const CLOSE_COLOR = '\x1b[0m';

export const requestLogger = (req, res, next) => {
  const { method, query, path } = req;
  const queryParams = Object.keys(query)
    .map((key) => {
      return `${key}=${query[key]}`;
    })
    .join();
  stdout.write(
    `${YELLOW}[LOG] Request ${method} ${path}${
      queryParams ? ` with params: ${queryParams}` : ``
    }${CLOSE_COLOR}\n`
  );
  return next();
};
