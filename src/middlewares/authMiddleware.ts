import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers['authorization'];
  const token = authorization?.slice(7, authorization.length);
  if (!token) {
    return res.sendStatus(401);
  }
  const secret = process.env.JWT_SECRET || 'seu_secret_key';
  const match = jwt.verify(token, secret);
  if (!match) {
    return res.sendStatus(401);
  }
  next();
};

export default authMiddleware;
