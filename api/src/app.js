import express from 'express';
import { usersRouter } from './routes';

const app = express();
const port = 8080;

app.use(express.json());
app.use('/users', usersRouter);

app.listen(port, () => {
  const { stdout } = process;
  stdout.write(`Server is running on port ${port}`);
});
