import * as dotenv from "dotenv";
import cors from 'cors';

dotenv.config();

import express from "express";
import postRoutes from "./routes/postRoutes";
import authRoutes from "./routes/authRoutes";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import errorHandler from "./middlewares/errorHandler";
import userRoutes from "./routes/userRoutes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:3001',
}));

app.use(express.json());

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
    </ul>
  `);
});

// Roteamento
app.use("/api", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);

// Middleware de manejo de erros
app.use(errorHandler);

// Configuração do Swagger
const swaggerDocument = YAML.load("./swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
