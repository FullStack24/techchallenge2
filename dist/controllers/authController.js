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
exports.register = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userService_1 = __importDefault(require("../services/userService"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Usuário e senha são obrigatórios" });
        }
        const user = yield userService_1.default.validateUser(email, password);
        if (!user) {
            return res.status(401).json({ message: "Credenciais inválidas" });
        }
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            console.error("Chave secreta JWT não definida");
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, secret, { expiresIn: "1h" });
        return res.status(200).json({
            token,
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
            },
        });
    }
    catch (error) {
        console.error("Erro ao realizar login:", error);
        return res.status(500).json({ message: "Erro interno do servidor" });
    }
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res
                .status(400)
                .json({ message: "Usuário, email e senha são obrigatórios" });
        }
        const newUser = yield userService_1.default.createUser(username, email, password);
        if (!newUser) {
            return res.status(400).json({
                message: "Erro ao criar usuário. Verifique se o nome de usuário já está em uso.",
            });
        }
        return res.status(201).json({ message: "Usuário criado com sucesso" });
    }
    catch (error) {
        console.error("Erro ao criar usuário:", error);
        return res.status(500).json({ message: "Erro interno do servidor" });
    }
});
exports.register = register;
