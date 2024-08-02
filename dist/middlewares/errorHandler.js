"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    console.error("Error stack:", err.stack);
    res.status(500).json({
        error: "Erro interno do servidor.",
        message: err.message || "Ocorreu um erro inesperado. Tente novamente mais tarde.",
    });
};
exports.default = errorHandler;
