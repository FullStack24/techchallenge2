"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Algo deu errado!',
        error: err.message || 'Erro desconhecido',
    });
};
exports.default = errorHandler;
