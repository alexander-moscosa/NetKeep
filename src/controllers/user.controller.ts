// Express
import { Request, Response } from 'express';

// Crypt
import bcrypt from 'bcrypt';

// Mongo Schemas 
import mongoose from 'mongoose';
import { userSchema } from '../schemas/User';

// JSON Web Token
import jwt from 'jsonwebtoken';
import JWT from '../helpers/JWT';

// Register a new user
export const register = (req: Request, res: Response): Response | void => {

    const body = req.body;

    if (!body.password || !body.username) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Fill the fields correctly'
            }
        });
    }

    const user = new userSchema({
        username: body.username,
        password: bcrypt.hashSync(body.password, 10)
    });

    user.save((err: mongoose.CallbackError, user: any) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        const token = JWT.sign(user, process.env.SEED || 'secret', '365d');

        return res.json({
            ok: true,
            success: {
                message: 'User created successfully',
                user,
                token
            }
        });
    });
}

export const login = (req: Request, res: Response): Response | void => {

    const body = req.body;

    if (!body.password || !body.username) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Fill the fields correctly'
            }
        });
    }

    userSchema.findOne({ username: body.username }, (err: mongoose.CallbackError, user: any) => {

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

        if (!bcrypt.compareSync(body.password, user.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'username or [password] incorrect'
                }
            });
        }

        const token = JWT.sign(user, process.env.SEED || 'secret', '365d');

        res.json({
            ok: true,
            success: {
                message: 'Logged in successfully',
                user,
                token
            }
        });
    });
}