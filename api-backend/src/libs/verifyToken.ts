import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

interface IPayload {
    _id: string;
    iat: number;
    exp: number;
}

export const TokenValidation = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('auth-token');
    if(!token || token === null) return res.status(401).json("Access Denied");
    
    // Token Verification
    const payload = jwt.verify(token, process.env.TOKEN_SECRET || 'token_secret') as IPayload;
    req.userId = payload._id;
    
    next();
}