"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePost = exports.postValidationRules = void 0;
const express_validator_1 = require("express-validator");
const postValidationRules = () => {
    return [
        (0, express_validator_1.check)("title")
            .notEmpty()
            .withMessage("O título é obrigatório.")
            .isLength({ max: 255 })
            .withMessage("O título deve ter no máximo 255 caracteres."),
        (0, express_validator_1.check)("content")
            .notEmpty()
            .withMessage("O conteúdo é obrigatório.")
            .isLength({ max: 5000 })
            .withMessage("O conteúdo deve ter no máximo 5000 caracteres."),
    ];
};
exports.postValidationRules = postValidationRules;
const validatePost = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: "Dados de entrada inválidos.",
            message: "Verifique os erros abaixo e tente novamente.",
            errors: errors.array(),
        });
    }
    next();
};
exports.validatePost = validatePost;
