"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postRoutes_1 = __importDefault(require("./routes/postRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
// Roteamento
app.use('/api', postRoutes_1.default);
app.use('/api/auth', authRoutes_1.default);
// Middleware de manejo de erros
app.use(errorHandler_1.default);
// Configuração do Swagger
const swaggerDocument = yamljs_1.default.load('./swagger.yaml');
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
