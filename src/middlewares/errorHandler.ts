import { Request, Response } from "express";
import { AppError } from "../errors/AppError";

const errorHandler = (err: AppError, req: Request, res: Response) => {
  return res.status(err.statusCode).json({ message: err.message });
  console.error(err);
  res.status(500).json({ message: "Erro interno do servidor!" });
};

export default errorHandler;
