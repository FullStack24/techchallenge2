"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = require("../errors/AppError");
const authMiddleware = (req, res, next) => {
    const authHeader = req.header("Authorization");
    const token = authHeader ? authHeader.replace(/^Bearer\s/, "") : "";
    if (!token) {
        throw new AppError_1.AppError("Acesso negado. Token não fornecido.", 401);
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "seu_secret_key");
        req.user = decoded;
        next();
    }
    catch (err) {
        throw new AppError_1.AppError("Token inválido.", 401);
    }
};
exports.default = authMiddleware;
