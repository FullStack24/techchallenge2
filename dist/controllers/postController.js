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
const postService_1 = __importDefault(require("../services/postService"));
const AppError_1 = require("../errors/AppError"); // Importando a classe de erro personalizada
const logger_1 = __importDefault(require("../config/logger")); // Importando o logger
const postController = {
    getAllPosts: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const posts = yield postService_1.default.getAllPosts();
            res.json(posts);
        }
        catch (error) {
            logger_1.default.error('Erro ao recuperar posts: ' + (error instanceof Error ? error.message : 'Erro desconhecido'));
            throw new AppError_1.AppError('Erro ao recuperar posts', 500);
        }
    }),
    getPostById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const post = yield postService_1.default.getPostById(Number(req.params.id));
            if (!post) {
                logger_1.default.warn(`Post not found with ID: ${req.params.id}`);
                throw new AppError_1.AppError('Post not found', 404);
            }
            res.json(post);
        }
        catch (error) {
            logger_1.default.error('Erro ao recuperar o post: ' + (error instanceof Error ? error.message : 'Erro desconhecido'));
            if (error instanceof AppError_1.AppError) {
                res.status(error.statusCode).json({ message: error.message });
            }
            else {
                res.status(500).json({ message: 'Erro ao recuperar o post' });
            }
        }
    }),
    createPost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newPost = yield postService_1.default.createPost(req.body);
            res.status(201).json(newPost);
        }
        catch (error) {
            logger_1.default.error('Erro ao criar post: ' + (error instanceof Error ? error.message : 'Erro desconhecido'));
            throw new AppError_1.AppError('Erro ao criar post', 500);
        }
    }),
    updatePost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const updatedPost = yield postService_1.default.updatePost(Number(req.params.id), req.body);
            if (!updatedPost) {
                logger_1.default.warn(`Post not found with ID: ${req.params.id}`);
                throw new AppError_1.AppError('Post not found', 404);
            }
            res.json(updatedPost);
        }
        catch (error) {
            logger_1.default.error('Erro ao atualizar o post: ' + (error instanceof Error ? error.message : 'Erro desconhecido'));
            if (error instanceof AppError_1.AppError) {
                res.status(error.statusCode).json({ message: error.message });
            }
            else {
                res.status(500).json({ message: 'Erro ao atualizar o post' });
            }
        }
    }),
    deletePost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield postService_1.default.deletePost(Number(req.params.id));
            res.status(204).send(); // Retorna 204 No Content após a exclusão
        }
        catch (error) {
            logger_1.default.error('Erro ao deletar o post: ' + (error instanceof Error ? error.message : 'Erro desconhecido'));
            throw new AppError_1.AppError('Erro ao deletar o post', 500);
        }
    }),
    searchPosts: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const posts = yield postService_1.default.searchPosts(req.query.q);
            res.json(posts);
        }
        catch (error) {
            logger_1.default.error('Erro ao buscar posts: ' + (error instanceof Error ? error.message : 'Erro desconhecido'));
            throw new AppError_1.AppError('Erro ao buscar posts', 500);
        }
    })
};
exports.default = postController;
