"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Express
const express_1 = __importDefault(require("express"));
// Cors
const cors_1 = __importDefault(require("cors"));
// MongoDB
const mongoose_1 = __importDefault(require("mongoose"));
// Routes
const user_routes_1 = __importDefault(require("../routes/user.routes"));
class Server {
    constructor(_port, _mongoURI) {
        this._app = (0, express_1.default)();
        this._port = _port;
        this._mongoURI = _mongoURI;
        this._apiPath = {
            user: '/api/v1/user'
        };
    }
    confCors() {
        this._app.use((0, cors_1.default)({
            origin: '*',
            methods: ['GET', 'POST'],
            credentials: true
        }));
    }
    parseBody() {
        this._app.use(express_1.default.urlencoded({ extended: false }));
        this._app.use(express_1.default.json());
    }
    routes() {
        this._app.use(this._apiPath.user, user_routes_1.default);
    }
    connectDB() {
        mongoose_1.default.connect(this._mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, (err) => {
            if (err) {
                console.log(`\n[x] Couldn't connect to Database!\n`);
                return;
            }
            console.log(`\n[*] Database working!\n`);
        });
    }
    listen() {
        this._app.listen(this._port, () => {
            console.log(`\n[*] Server is currently running on port ${this._port}`);
        });
    }
}
exports.default = Server;
