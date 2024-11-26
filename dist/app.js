"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const postRoutes_1 = __importDefault(require("./routes/postRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const commentRoutes_1 = __importDefault(require("./routes/commentRoutes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
dotenv.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)({
    origin: ['http://localhost:3001', 'http://localhost:8081']
}));
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send(`
    <h1>Bem-vindo ao EducaBlog!</h1>
    <p>EducaBlog é uma plataforma dinâmica e acessível para que professores da rede pública possam compartilhar conteúdo educativo com seus alunos.</p>
    <p>Para começar a usar, você pode acessar a documentação da API em <a href="/api-docs">/api-docs</a>.</p>
    <h2>Endpoints principais:</h2>
    <ul>
      <li><strong>GET /api/users</strong>: Lista todos os usuários.</li>
      <li><strong>POST /api/auth/register</strong>: Registra um novo usuário.</li>
      <li><strong>POST /api/auth/login</strong>: Autentica um usuário e retorna um token JWT.</li>
      <li><strong>GET /api/posts</strong>: Lista todos os posts (Requer autenticação).</li>
      <li><strong>GET /api/posts/:id</strong>: Obtém um post por ID (Requer autenticação).</li>
      <li><strong>POST /api/posts</strong>: Cria um novo post (Requer autenticação).</li>
      <li><strong>PUT /api/posts/:id</strong>: Atualiza um post existente (Requer autenticação).</li>
      <li><strong>DELETE /api/posts/:id</strong>: Exclui um post (Requer autenticação).</li>
      <li><strong>GET /api/posts/search?q=palavra-chave</strong>: Busca posts por palavra-chave (Requer autenticação).</li>
      <li><strong>POST /api/posts/:postId/comments</strong>: Cria um novo comentário (Requer autenticação).</li>
      <li><strong>DELETE /api/comments/:id</strong>: Exclui um comentário (Requer autenticação).</li>
    </ul>
  `);
});
// Roteamento
app.use("/api", postRoutes_1.default);
app.use("/api/auth", authRoutes_1.default);
app.use("/api", userRoutes_1.default);
app.use("/api", commentRoutes_1.default);
// Middleware de manejo de erros
app.use(errorHandler_1.default);
// Configuração do Swagger
const swaggerDocument = yamljs_1.default.load("./swagger.yaml");
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
