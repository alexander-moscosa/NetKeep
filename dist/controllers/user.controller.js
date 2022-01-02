"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
// Crypt
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = require("../schemas/User");
const JWT_1 = __importDefault(require("../helpers/JWT"));
// Register a new user
const register = (req, res) => {
    const body = req.body;
    if (!body.password || !body.username) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Fill the fields correctly'
            }
        });
    }
    const user = new User_1.userSchema({
        username: body.username,
        password: bcrypt_1.default.hashSync(body.password, 10)
    });
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        const token = JWT_1.default.sign(user, process.env.SEED || 'secret', '365d');
        return res.json({
            ok: true,
            success: {
                message: 'User created successfully',
                user,
                token
            }
        });
    });
};
exports.register = register;
const login = (req, res) => {
    const body = req.body;
    if (!body.password || !body.username) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Fill the fields correctly'
            }
        });
    }
    User_1.userSchema.findOne({ username: body.username }, (err, user) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!user) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: '[username] or password incorrect'
                }
            });
        }
        if (!bcrypt_1.default.compareSync(body.password, user.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'username or [password] incorrect'
                }
            });
        }
        const token = JWT_1.default.sign(user, process.env.SEED || 'secret', '365d');
        res.json({
            ok: true,
            success: {
                message: 'Logged in successfully',
                user,
                token
            }
        });
    });
};
exports.login = login;
