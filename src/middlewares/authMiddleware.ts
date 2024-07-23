import { Request, Response, NextFunction } from 'express';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];

  if (!token || token !== 'Bearer seu_token_aqui') {
    return res.status(403).json({ message: 'Acesso negado. Usuário não autorizado.' });
  }

  next();
};

export default authMiddleware;