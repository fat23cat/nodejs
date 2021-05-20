import express from 'express';
import { usersRouter, groupsRouter } from './routes';
import { sequelize } from '../data-access';
import { requestLogger, unhandledErrorLogger } from './middlewares';
import {
  uncaughtExceptionHandler,
  unhandledPromiseRejectionHandler
} from './helpers';

const { stdout } = process;

const app = express();
const port = 8080;

app.use(express.json());
app.use(requestLogger);

app.use('/users', usersRouter);
app.use('/groups', groupsRouter);

app.use(unhandledErrorLogger);

app.listen(port, () => {
  uncaughtExceptionHandler();
  unhandledPromiseRejectionHandler();
  stdout.write(`Server is running on port ${port}\n`);
});

sequelize
  .authenticate()
  .then(() => {
    stdout.write('Database connection has been established successfully.\n');
  })
  .catch((err) => {
    stdout.write('Unable to connect to the database:', err);
  });
