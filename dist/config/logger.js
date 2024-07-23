"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const logger = winston_1.default.createLogger({
    level: 'info',
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.json()),
    transports: [
        new winston_1.default.transports.Console(), // Log para o console
        new winston_1.default.transports.File({ filename: 'error.log', level: 'error' }), // Logs de erro em um arquivo
        new winston_1.default.transports.File({ filename: 'combined.log' }) // Logs combinados
    ],
});
exports.default = logger;
