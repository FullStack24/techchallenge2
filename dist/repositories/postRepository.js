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
            const { title, content = '', author } = data; // Definir conteúdo padrão como uma string vazia
            const result = yield prisma.post.create({
                data: {
                    title,
                    content,
                    author,
                },
            });
            return result;
        });
    },
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield prisma.post.findMany();
            return result.map((row) => ({
                id: row.id,
                title: row.title,
                content: row.content,
                author: row.author,
                createdAt: row.createdAt,
                updatedAt: row.updatedAt,
            }));
        });
    },
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield prisma.post.findUnique({
                where: { id },
            });
            return result ? result : null;
        });
    },
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, content = '' } = data; // Definir conteúdo padrão como uma string vazia
            const result = yield prisma.post.update({
                where: { id },
                data: {
                    title,
                    content,
                    updatedAt: new Date(),
                },
            });
            return result ? result : null;
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
            const result = yield prisma.post.findMany({
                where: {
                    OR: [
                        { title: { contains: keyword, mode: "insensitive" } },
                        { content: { contains: keyword, mode: "insensitive" } },
                    ],
                },
            });
            return result.map((row) => ({
                id: row.id,
                title: row.title,
                content: row.content,
                author: row.author,
                createdAt: row.createdAt,
                updatedAt: row.updatedAt,
            }));
        });
    },
    customQuery(query, params) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.$queryRaw(query, ...params);
        });
    },
};
exports.default = PostRepository;
