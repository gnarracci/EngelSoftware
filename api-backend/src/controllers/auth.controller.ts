import {Request, Response} from 'express';
import User, {IUser} from '../models/User';
import jwt from 'jsonwebtoken';

export const signup = async (req: Request, res: Response) => {

    // User Save
    const user: IUser = new User({
        user: req.body.user,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    })
    user.password = await user.encryptPassword(user.password);
    const saveduser = await user.save();
     // Token
     const token: string = jwt.sign({_id: saveduser._id}, process.env.TOKEN_SECRET || 'token_secret', {
        expiresIn: 60 * 60
     });
    res.header('auth-token', token).json(saveduser);
};

export const signin = async (req: Request, res: Response) => {
   const user = await User.findOne({user: req.body.user});
   if(!user) return res.status(400).json("User is wrong or not exits");

   const correctPassword: boolean = await user.validatePassword(req.body.password);
   if(!correctPassword) return res.status(400).json("Invalid Password");
   
   const token: string = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET || "token_secret", {
    expiresIn: 60 * 60
   });
   res.header('auth-token', token).json(user);
};

export const profile = async (req: Request, res: Response) => {
    const user = await User.findById(req.userId, { password: 0});
    if(!user) return res.status(404).json("No User found");
    res.json(user);
}