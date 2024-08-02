"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
var path_1 = require("path");
var envPath = path_1.default.resolve(__dirname, '../.env');
dotenv.config({ path: envPath });
console.log("JWT_SECRET from env:", process.env.JWT_SECRET);
