import { Request, Response, NextFunction } from 'express';

const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
  console.error(err.stack);

  res.status(500).json({
    message: 'Algo deu errado!',
    error: err.message || 'Erro desconhecido',
  });
};

export default errorHandler;
