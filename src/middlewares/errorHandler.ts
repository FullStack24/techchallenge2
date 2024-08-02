import { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error("Error stack:", err.stack);

  res.status(500).json({
    error: "Erro interno do servidor.",
    message:
      err.message || "Ocorreu um erro inesperado. Tente novamente mais tarde.",
  });
};

export default errorHandler;
