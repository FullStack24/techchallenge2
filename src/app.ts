import express from "express";
import postRoutes from "./routes/postRoutes";
import authRoutes from "./routes/authRoutes";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import errorHandler from "./middlewares/errorHandler";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Roteamento
app.use("/api", postRoutes);
app.use("/api/auth", authRoutes);

// Middleware de manejo de erros
app.use(errorHandler);

// Configuração do Swagger
const swaggerDocument = YAML.load("./swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
