"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    const authorization = req.headers['authorization'];
    if (!authorization) {
        return res.sendStatus(401);
    }
    const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : null;
    if (!token) {
        return res.sendStatus(401);
    }
    const secret = process.env.JWT_SECRET || 'your_secret_key';
    try {
        req.user = jsonwebtoken_1.default.verify(token, secret);
        next();
    }
    catch (err) {
        return res.sendStatus(401);
    }
};
exports.default = authMiddleware;
