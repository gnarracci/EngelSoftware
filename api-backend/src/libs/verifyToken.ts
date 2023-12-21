import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import Role from '../models/Role';

interface IPayload {
    _id: string;
    iat: number;
    exp: number;
}

export const TokenValidation = (req: Request, res: Response, next: NextFunction) => {

    // Token Reception
    const token = req.header('Authorization');
    if(!token || token === null) return res.status(401).json("Access Denied");
    
    // Token Verification
    const payload = jwt.verify(token, process.env.TOKEN_SECRET || 'token_secret') as IPayload;
    req.userId = payload._id;
    
    next();
}

    // Role Verification

export const isUser = async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.userId)
    const roles = await Role.find({_id: {$in: user?.role}})
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "user") {
            next()
            return;
        }
    }
    return res.status(403).json({message: "To perform this action user role is needed!"});
}

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.userId)
    const roles = await Role.find({_id: {$in: user?.role}})
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
            next()
            return;
        }
    }
    return res.status(403).json({message: "To preform this action admin role is needed!"});
}