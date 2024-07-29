"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token || token !== 'Bearer seu_token_aqui') {
        return res.status(403).json({ message: 'Acesso negado. Usuário não autorizado.' });
    }
    next();
};
exports.default = authMiddleware;
