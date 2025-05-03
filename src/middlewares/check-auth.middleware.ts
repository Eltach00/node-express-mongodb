import jwt from 'jsonwebtoken';

export const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Bearer token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = { email: decodedToken.email, userId: decodedToken.userId };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Auth failed' });
  }
};
