"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPosts = exports.searchPosts = exports.deletePost = exports.updatePost = exports.getPostById = exports.createPost = void 0;
const postService_1 = __importDefault(require("../services/postService"));
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, author } = req.body;
    const post = yield postService_1.default.createPost({ title, content, author });
    res.status(201).json(post);
});
exports.createPost = createPost;
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const post = yield postService_1.default.getPostById((id));
    if (post) {
        res.status(200).json(post);
    }
    else {
        res.status(404).json({ message: "Postagem não encontrada" });
    }
});
exports.getPostById = getPostById;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, content } = req.body;
    const post = yield postService_1.default.updatePost((id), { title, content });
    if (post) {
        res.status(200).json(post);
    }
    else {
        res.status(404).json({ message: "Postagem não encontrada" });
    }
});
exports.updatePost = updatePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const post = yield postService_1.default.getPostById((id));
    if (post) {
        yield postService_1.default.deletePost((id));
        res.status(200).json({ message: "Postagem excluída com sucesso" });
    }
    else {
        res.status(404).json({ message: "Postagem não encontrada" });
    }
});
exports.deletePost = deletePost;
const searchPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { keyword } = req.query;
    const posts = yield postService_1.default.searchPosts(keyword);
    res.status(200).json(posts);
});
exports.searchPosts = searchPosts;
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield postService_1.default.getAllPosts();
    res.status(200).json(posts);
});
exports.getAllPosts = getAllPosts;
