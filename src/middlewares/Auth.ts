import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = ( req: Request | any, res: Response, next: NextFunction ): Response | void => {

    const token: string | undefined = req.get('token');

    if ( !token ) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'You are not authorized to use this function!'
            }
        });
    }

    jwt.verify( token, process.env.SEED || 'secret', ( err, decoded: any ) => {
        
        if ( err ){
            return res.status(400).json({
                ok: false,
                err
            });
        }
        
        req.user = decoded.payload;
    
        next();
    });
}