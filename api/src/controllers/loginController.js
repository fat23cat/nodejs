import { controllerLogger } from '../helpers';
import { usersService } from '../services';
import bcrypt from 'bcrypt';
import { generateAccessToken } from '../helpers';

const CONTROLLER_NAME = 'LoginController';

export const logIn = async (req, res, next) => {
  try {
    const { login, password } = req.body;
    const user = await usersService.getUserByLogin(login);
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateAccessToken(login);
      res.status(200).json({
        token
      });
    } else {
      res.status(403).json({
        message: 'Incorrect login or password'
      });
    }
  } catch (err) {
    controllerLogger(CONTROLLER_NAME, 'logIn', req, err);
    return next(err);
  }
};
