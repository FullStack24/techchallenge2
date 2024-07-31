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
const validateUser = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    return userRepository_1.default.validateUser(username, password);
});
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return userRepository_1.default.getUserById(userId);
});
const createUser = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    return userRepository_1.default.createUser(username, password);
});
exports.default = { validateUser, getUserById, createUser };
