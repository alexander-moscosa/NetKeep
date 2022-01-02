import { Request, Response } from 'express';

// Get All Users [PU] 
export const getAll = ( req: Request, res: Response ): void => {
    res.json({ok: true});
}