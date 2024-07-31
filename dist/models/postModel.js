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
const PostModel = {
    create: (data) => __awaiter(void 0, void 0, void 0, function* () {
        return prisma.post.create({
            data,
        });
    }),
    findAll: () => __awaiter(void 0, void 0, void 0, function* () {
        return prisma.post.findMany();
    }),
    findById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return prisma.post.findUnique({
            where: { id },
        });
    }),
    update: (id, data) => __awaiter(void 0, void 0, void 0, function* () {
        return prisma.post.update({
            where: { id },
            data,
        });
    }),
    delete: (id) => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma.post.delete({
            where: { id },
        });
    }),
    search: (keyword) => __awaiter(void 0, void 0, void 0, function* () {
        return prisma.post.findMany({
            where: {
                OR: [
                    { title: { contains: keyword, mode: "insensitive" } },
                    { content: { contains: keyword, mode: "insensitive" } },
                ],
            },
        });
    }),
};
exports.default = PostModel;
