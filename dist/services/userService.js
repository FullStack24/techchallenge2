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
const userRepository_1 = __importDefault(require("../repositories/userRepository"));
const validateUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    return userRepository_1.default.validateUser(email, password);
});
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return userRepository_1.default.getUserById(userId);
});
const createUser = (username, email, password, role) => __awaiter(void 0, void 0, void 0, function* () {
    return userRepository_1.default.createUser(username, email, password, role);
});
const updateUser = (userId, userData) => __awaiter(void 0, void 0, void 0, function* () {
    return userRepository_1.default.updateUser(userId, userData);
});
const listAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return userRepository_1.default.findAll();
});
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return userRepository_1.default.deleteUser(userId);
});
exports.default = { validateUser, getUserById, createUser, listAllUsers, deleteUser, updateUser };
