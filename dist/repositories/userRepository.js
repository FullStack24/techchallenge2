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
const UserRepository = {
    validateUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.user.findFirst({
                where: {
                    email,
                    password,
                },
                select: {
                    id: true,
                    username: true,
                    email: true,
                    password: false,
                    role: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });
        });
    },
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.user.findUnique({
                where: { id: userId },
                select: {
                    id: true,
                    username: true,
                    email: true,
                    password: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });
        });
    },
    createUser(username, email, password, role) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.user.create({
                data: {
                    username,
                    email,
                    password,
                    role,
                },
                select: {
                    id: true,
                    username: true,
                    email: true,
                    role: true,
                    password: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });
        });
    },
    updateUser(userId, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.user.update({
                where: { id: userId },
                data: userData,
                select: {
                    id: true,
                    username: true,
                    email: true,
                    role: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });
        });
    },
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield prisma.user.findMany();
            return users.map((user) => ({
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            }));
        });
    },
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.user.delete({
                where: { id: userId },
            });
        });
    },
};
exports.default = UserRepository;
