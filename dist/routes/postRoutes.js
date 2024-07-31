"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postController_1 = require("../controllers/postController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const validationMiddleware_1 = require("../middlewares/validationMiddleware");
const router = (0, express_1.Router)();
router.get("/posts", postController_1.getAllPosts);
router.get("/posts/search", postController_1.searchPosts);
router.get("/posts/:id", postController_1.getPostById);
router.put("/posts/:id", authMiddleware_1.default, ...(0, validationMiddleware_1.postValidationRules)(), validationMiddleware_1.validatePost, postController_1.updatePost);
router.delete("/posts/:id", authMiddleware_1.default, postController_1.deletePost);
router.post("/posts", authMiddleware_1.default, ...(0, validationMiddleware_1.postValidationRules)(), validationMiddleware_1.validatePost, postController_1.createPost);
exports.default = router;
