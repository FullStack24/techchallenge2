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
const postModel_1 = __importDefault(require("../models/postModel"));
jest.mock('../models/postModel');
describe('PostService', () => {
    it('deve criar um novo post', () => __awaiter(void 0, void 0, void 0, function* () {
        const newPost = { title: 'Test Title', content: 'Test Content', author: 'Test Author' };
        postModel_1.default.create.mockResolvedValue(newPost);
        const createdPost = yield postService_1.default.createPost(newPost);
        expect(createdPost).toEqual(newPost);
    }));
});
