import jwt from 'jsonwebtoken';

export const authGuard = (req, res, next) => {
  const header = req.headers.authorization;
  const token = header && header.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      message: 'You are not authorized, please login'
    });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err) => {
    if (err) {
      return res.status(403).json({
        message: 'Invalid access token'
      });
    }
    next();
  });
};
