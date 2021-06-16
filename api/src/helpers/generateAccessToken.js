import jwt from 'jsonwebtoken';

export const generateAccessToken = (login) => {
  return jwt.sign({ login }, process.env.SECRET_KEY, {
    expiresIn: '1800s'
  });
};
