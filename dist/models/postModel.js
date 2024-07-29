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
const database_1 = __importDefault(require("../config/database"));
const PostModel = {
    create: (data) => __awaiter(void 0, void 0, void 0, function* () {
        const { title, content, author } = data;
        const result = yield database_1.default.query('INSERT INTO posts (title, content, author, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW()) RETURNING *', [title, content, author]);
        return result.rows[0];
    }),
    findAll: () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield database_1.default.query('SELECT * FROM posts');
        return result.rows.map(row => ({
            id: row.id,
            title: row.title,
            content: row.content,
            author: row.author,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
        }));
    }),
    findById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield database_1.default.query('SELECT * FROM posts WHERE id = $1', [id]);
        return result.rows.length > 0 ? result.rows[0] : null;
    }),
    update: (id, data) => __awaiter(void 0, void 0, void 0, function* () {
        const { title, content } = data;
        const result = yield database_1.default.query('UPDATE posts SET title = $1, content = $2, updated_at = NOW() WHERE id = $3 RETURNING *', [title, content, id]);
        return result.rows.length > 0 ? result.rows[0] : null;
    }),
    delete: (id) => __awaiter(void 0, void 0, void 0, function* () {
        yield database_1.default.query('DELETE FROM posts WHERE id = $1', [id]);
    }),
    search: (keyword) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield database_1.default.query('SELECT * FROM posts WHERE title ILIKE $1 OR content ILIKE $1', [`%${keyword}%`]);
        return result.rows.map(row => ({
            id: row.id,
            title: row.title,
            content: row.content,
            author: row.author,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
        }));
    })
};
exports.default = PostModel;
