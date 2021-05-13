import express from 'express';
import { usersRouter, groupsRouter } from './routes';
import { sequelize } from '../data-access';

const { stdout } = process;

const app = express();
const port = 8080;

app.use(express.json());
app.use('/users', usersRouter);
app.use('/groups', groupsRouter);

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
