import express from 'express';
import { usersRouter, groupsRouter, loginRouter } from './routes';
import { sequelize } from '../data-access';
import { requestLogger, unhandledErrorLogger, authGuard } from './middlewares';
import {
  uncaughtExceptionHandler,
  unhandledPromiseRejectionHandler
} from './helpers';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const { stdout } = process;

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());

app.use(express.json());
app.use(requestLogger);

app.use('/login', loginRouter);
app.use('/users', authGuard, usersRouter);
app.use('/groups', authGuard, groupsRouter);

app.use(unhandledErrorLogger);

uncaughtExceptionHandler();
unhandledPromiseRejectionHandler();

app.listen(port, () => {
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
