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
exports.likePost = exports.getAllPosts = exports.searchPosts = exports.deletePost = exports.updatePost = exports.getPostById = exports.createPost = void 0;
const postService_1 = __importDefault(require("../services/postService"));
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, author } = req.body;
    try {
        const post = yield postService_1.default.createPost({ title, content, author });
        res.status(201).json(post);
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao criar postagem" });
    }
});
exports.createPost = createPost;
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const post = yield postService_1.default.getPostById(id);
        if (post) {
            res.status(200).json(post);
        }
        else {
            res.status(404).json({ message: "Postagem não encontrada" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao buscar postagem" });
    }
});
exports.getPostById = getPostById;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, content, author } = req.body;
    try {
        const existingPost = yield postService_1.default.getPostById(id);
        if (!existingPost) {
            return res.status(404).json({ message: "Postagem não encontrada" });
        }
        const updatedPost = yield postService_1.default.updatePost(id, {
            title,
            content,
            author,
        });
        res.status(200).json(updatedPost);
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao atualizar postagem" });
    }
});
exports.updatePost = updatePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const post = yield postService_1.default.getPostById(id);
        if (post) {
            yield postService_1.default.deletePost(id);
            res.status(200).json({ message: "Postagem excluída com sucesso" });
        }
        else {
            res.status(404).json({ message: "Postagem não encontrada" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao excluir postagem" });
    }
});
exports.deletePost = deletePost;
const searchPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { keyword } = req.query;
    try {
        const posts = yield postService_1.default.searchPosts(keyword);
        res.status(200).json(posts);
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao buscar postagens" });
    }
});
exports.searchPosts = searchPosts;
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield postService_1.default.getAllPosts();
        res.status(200).json(posts);
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao buscar postagens" });
    }
});
exports.getAllPosts = getAllPosts;
const likePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = req.params;
    if (!req.user) {
        console.log("User not authenticated.");
        return res.status(401).json({ message: "Usuário não autenticado." });
    }
    const userId = req.user.id;
    console.log("User ID:", userId);
    try {
        const alreadyLiked = yield postService_1.default.userLikedPost(userId, postId);
        console.log("Already liked:", alreadyLiked);
        if (alreadyLiked) {
            return res.status(400).json({ message: "Você já curtiu este post." });
        }
        yield postService_1.default.addLike(userId, postId);
        const post = yield postService_1.default.incrementLikes(postId);
        console.log("Post after liking:", post);
        return res.status(200).json(post);
    }
    catch (error) {
        console.error("Erro ao dar like no post:", error);
        return res.status(500).json({ message: "Erro ao dar like no post." });
    }
});
exports.likePost = likePost;
