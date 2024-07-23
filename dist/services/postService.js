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
const postModel_1 = __importDefault(require("../models/postModel"));
class PostService {
    createPost(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return postModel_1.default.create(data);
        });
    }
    getAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            return postModel_1.default.findAll();
        });
    }
    getPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return postModel_1.default.findById(id);
        });
    }
    updatePost(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return postModel_1.default.update(id, data);
        });
    }
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield postModel_1.default.delete(id);
        });
    }
    searchPosts(keyword) {
        return __awaiter(this, void 0, void 0, function* () {
            return postModel_1.default.search(keyword);
        });
    }
}
exports.default = new PostService();
