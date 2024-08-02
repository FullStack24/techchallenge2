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
const postRepository_1 = __importDefault(require("../repositories/postRepository"));
const postService_1 = __importDefault(require("../services/postService"));
jest.mock("../repositories/postRepository", () => {
    return {
        create: jest.fn(),
        findAll: jest.fn(),
        findById: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        search: jest.fn(),
    };
});
describe("PostService", () => {
    const newPost = {
        title: "Test Title",
        content: "Test Content",
        author: "Test Author",
    };
    const createdPostMock = Object.assign(Object.assign({ id: "1" }, newPost), { createdAt: new Date(), updatedAt: new Date() });
    const postsMock = [
        {
            id: "1",
            title: "Post 1",
            content: "Content 1",
            author: "Author 1",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: "2",
            title: "Post 2",
            content: "Content 2",
            author: "Author 2",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ];
    beforeEach(() => {
        jest.resetAllMocks();
    });
    it("deve criar um novo post", () => __awaiter(void 0, void 0, void 0, function* () {
        postRepository_1.default.create.mockResolvedValue(createdPostMock);
        const createdPost = yield postService_1.default.createPost(newPost);
        expect(createdPost).toEqual(createdPostMock);
        expect(postRepository_1.default.create).toHaveBeenCalledWith(newPost);
    }));
    it("deve obter um post por ID", () => __awaiter(void 0, void 0, void 0, function* () {
        postRepository_1.default.findById.mockResolvedValue(createdPostMock);
        const foundPost = yield postService_1.default.getPostById("1");
        expect(foundPost).toEqual(createdPostMock);
        expect(postRepository_1.default.findById).toHaveBeenCalledWith("1");
    }));
    it("deve atualizar um post", () => __awaiter(void 0, void 0, void 0, function* () {
        const updatedPostMock = Object.assign(Object.assign({}, createdPostMock), { title: "Updated Title" });
        postRepository_1.default.update.mockResolvedValue(updatedPostMock);
        const updatedPost = yield postService_1.default.updatePost("1", {
            title: "Updated Title",
        });
        expect(updatedPost).toEqual(updatedPostMock);
        expect(postRepository_1.default.update).toHaveBeenCalledWith("1", {
            title: "Updated Title",
        });
    }));
    it("deve deletar um post", () => __awaiter(void 0, void 0, void 0, function* () {
        postRepository_1.default.delete.mockResolvedValue(undefined);
        yield postService_1.default.deletePost("1");
        expect(postRepository_1.default.delete).toHaveBeenCalledWith("1");
    }));
    it("deve buscar posts por keyword", () => __awaiter(void 0, void 0, void 0, function* () {
        const keyword = "test";
        postRepository_1.default.search.mockResolvedValue(postsMock);
        const result = yield postService_1.default.searchPosts(keyword);
        expect(result).toEqual(postsMock);
        expect(postRepository_1.default.search).toHaveBeenCalledWith(keyword);
    }));
    it("deve obter todos os posts", () => __awaiter(void 0, void 0, void 0, function* () {
        postRepository_1.default.findAll.mockResolvedValue(postsMock);
        const result = yield postService_1.default.getAllPosts();
        expect(result).toEqual(postsMock);
        expect(postRepository_1.default.findAll).toHaveBeenCalled();
    }));
});
