import express from 'express';

const app = express();
app.use(express.json());
const port = 8080;

app.listen(port, () => {
  const { stdout } = process;
  stdout.write(`Server is running on port ${port}`);
});
