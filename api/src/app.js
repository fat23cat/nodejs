import express from 'express';
import { usersRouter, groupsRouter } from './routes';
import db from './models';

const { stdout } = process;

const app = express();
const port = 8080;

app.use(express.json());
app.use('/users', usersRouter);
app.use('/groups', groupsRouter);

app.listen(port, () => {
  stdout.write(`Server is running on port ${port}\n`);
});

db.sequelize
  .authenticate()
  .then(() => {
    stdout.write('Database connection has been established successfully.\n');
  })
  .catch((err) => {
    stdout.write('Unable to connect to the database:', err);
  });
