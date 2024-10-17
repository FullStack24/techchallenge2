import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const roleMiddleware = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Acesso negado" });
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

            if (!roles.includes(decoded.role)) {
                return res.status(403).json({ message: "Acesso negado: Permissão insuficiente" });
            }
            next();
        } catch (error) {
            console.error("JWT Verification Error:", error);
            return res.status(401).json({ message: "Token inválido" });
        }
    };
};

export default roleMiddleware;