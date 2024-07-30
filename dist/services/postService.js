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
class PostService {
    constructor(postRepository) {
        this.postRepository = postRepository;
    }
    createPost(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.postRepository.create(data);
        });
    }
    getAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.postRepository.findAll();
        });
    }
    getPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.postRepository.findById(id);
        });
    }
    updatePost(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.postRepository.update(id, data);
        });
    }
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.postRepository.delete(id);
        });
    }
    searchPosts(keyword) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.postRepository.search(keyword);
        });
    }
}
exports.default = new PostService(postRepository_1.default);
