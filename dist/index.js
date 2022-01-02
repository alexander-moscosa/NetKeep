"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Dotenv Configuration
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Static Files
const Server_1 = __importDefault(require("./models/Server"));
// Instance the main class
const server = new Server_1.default(process.env.PORT || '8080', process.env.MONGO_URI || '');
// Config Cors
server.confCors();
// Parse Body
server.parseBody();
// Routes
server.routes();
// Connect to Mongo
server.connectDB();
// Run Server
server.listen();
