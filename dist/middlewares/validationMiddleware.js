"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePost = exports.postValidationRules = void 0;
const express_validator_1 = require("express-validator");
const postValidationRules = () => {
    return [
        (0, express_validator_1.check)("title").notEmpty().withMessage("Title is required"),
        (0, express_validator_1.check)("content").notEmpty().withMessage("Content is required"),
    ];
};
exports.postValidationRules = postValidationRules;
const validatePost = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
};
exports.validatePost = validatePost;
