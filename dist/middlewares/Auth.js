"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const token = req.get('token');
    if (!token) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'You are not authorized to use this function!'
            }
        });
    }
    jsonwebtoken_1.default.verify(token, process.env.SEED || 'secret', (err, decoded) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        req.user = decoded.payload;
        next();
    });
};
exports.verifyToken = verifyToken;
