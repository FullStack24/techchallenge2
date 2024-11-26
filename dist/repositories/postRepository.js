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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const PostRepository = {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, content = "", author } = data;
            return prisma.post.create({
                data: {
                    title,
                    content,
                    author,
                },
            });
        });
    },
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.post.findMany();
        });
    },
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.post.findUnique({
                where: { id },
            });
        });
    },
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, content = "", author } = data;
            return prisma.post.update({
                where: { id },
                data: {
                    title,
                    content,
                    author,
                    updatedAt: new Date(),
                },
            });
        });
    },
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.post.delete({
                where: { id },
            });
        });
    },
    search(keyword) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.post.findMany({
                where: {
                    OR: [
                        { title: { contains: keyword, mode: "insensitive" } },
                        { content: { contains: keyword, mode: "insensitive" } },
                    ],
                },
            });
        });
    },
    userLikedPost(userId, postId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const like = yield prisma.like.findUnique({
                    where: {
                        userId_postId: {
                            userId,
                            postId,
                        },
                    },
                });
                return like !== null;
            }
            catch (error) {
                console.error("Error checking if user liked post:", error);
                throw error;
            }
        });
    },
    addLike(userId, postId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.like.create({
                data: {
                    userId,
                    postId,
                },
            });
        });
    },
    incrementLikes(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.post.update({
                where: { id: postId },
                data: {
                    likes: {
                        increment: 1,
                    },
                },
                select: {
                    id: true,
                    title: true,
                    content: true,
                    author: true,
                    likes: true,
                },
            });
        });
    },
};
exports.default = PostRepository;
