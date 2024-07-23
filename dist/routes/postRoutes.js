"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postController_1 = __importDefault(require("../controllers/postController"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const validationMiddleware_1 = require("../middlewares/validationMiddleware");
const router = (0, express_1.Router)();
router.get('/posts', postController_1.default.getAllPosts);
router.get('/posts/:id', postController_1.default.getPostById);
router.post('/posts', (0, validationMiddleware_1.postValidationRules)(), validationMiddleware_1.validatePost, postController_1.default.createPost);
router.put('/posts/:id', authMiddleware_1.default, validationMiddleware_1.postValidationRules, validationMiddleware_1.validatePost, postController_1.default.updatePost);
router.delete('/posts/:id', authMiddleware_1.default, postController_1.default.deletePost);
router.get('/posts/search', postController_1.default.searchPosts);
exports.default = router;
