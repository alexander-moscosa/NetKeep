"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JWT {
    static sign(payload, seed, expiration) {
        const token = jsonwebtoken_1.default.sign({
            payload
        }, seed, ({ expiresIn: expiration }));
        return token;
    }
}
exports.default = JWT;
