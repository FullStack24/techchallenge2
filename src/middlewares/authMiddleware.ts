import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "../types/express";

const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authorization = req.headers["authorization"];

  console.log("Authorization Header:", authorization);

  if (!authorization) {
    return res.status(401).json({
      error: "Token de autorização ausente.",
      message:
          "O cabeçalho de autorização não foi encontrado. Certifique-se de enviar um token no formato 'Bearer <token>'.",
    });
  }

  const token = authorization.startsWith("Bearer ") ? authorization.slice(7) : null;

  console.log("Extracted Token:", token);

  if (!token) {
    return res.status(401).json({
      error: "Token de autorização inválido.",
      message:
          "O token de autorização não está no formato correto. Certifique-se de que o token comece com 'Bearer '.",
    });
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    console.error("JWT_SECRET não está definido");
    return res.status(500).json({
      error: "Chave secreta não configurada.",
      message: "A chave secreta para verificar o token de autorização não está configurada.",
    });
  }

  try {
    const decoded = jwt.verify(token, secret) as { userId: string; role: string };
    console.log("Decoded Token:", decoded);

    if (!decoded || !decoded.userId) {
      return res.status(401).json({
        error: "Token inválido.",
        message: "O token de autorização não contém um 'userId' válido.",
      });
    }

    req.user = { id: decoded.userId, role: decoded.role };
    console.log("Decoded User:", req.user);

    next();
  } catch (err) {
    console.error("JWT Verification Error:", err);
    return res.status(401).json({
      error: "Token de autorização inválido ou expirado.",
      message: "O token de autorização não pôde ser verificado. Pode estar expirado ou não ser válido. Verifique se o token está correto e tente novamente.",
    });
  }
};

export default authMiddleware;