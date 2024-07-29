"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    return res.status(err.statusCode).json({ message: err.message });
    console.error(err);
    res.status(500).json({ message: 'Erro interno do servidor!' });
};
exports.default = errorHandler;
