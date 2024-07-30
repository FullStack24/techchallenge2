import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { AuthenticatedRequest, JwtPayload } from "../interfaces/JwtPayload";

const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.header("Authorization");
  const token = authHeader ? authHeader.replace(/^Bearer\s/, "") : "";

  if (!token) {
    throw new AppError("Acesso negado. Token não fornecido.", 401);
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "seu_secret_key",
    ) as JwtPayload;
    req.user = decoded;
    next();
  } catch (err) {
    throw new AppError("Token inválido.", 401);
  }
};

export default authMiddleware;
