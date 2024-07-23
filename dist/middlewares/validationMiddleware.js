"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePost = exports.postValidationRules = void 0;
const express_validator_1 = require("express-validator");
const postValidationRules = () => {
    return [
        (0, express_validator_1.body)('title').notEmpty().withMessage('O título é obrigatório.'),
        (0, express_validator_1.body)('content').notEmpty().withMessage('O conteúdo é obrigatório.'),
        (0, express_validator_1.body)('author').notEmpty().withMessage('O autor é obrigatório.')
    ];
};
exports.postValidationRules = postValidationRules;
const validatePost = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    else {
        next();
    }
};
exports.validatePost = validatePost;
