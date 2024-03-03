import { Request, Response } from "express";
import User from "../models/User";
import Role from "../models/Role";
import Company from "../models/Company";
import jwt from "jsonwebtoken";

export const signup = async (req: Request, res: Response) => {
  const { name, surname, username, email, password, role, company } = req.body;

  // If User previously exits
  const user = await User.findOne({ username: req.body.username });
  if (user) return res.status(400).json({ message: "Username has benn used!" });
  const mail = await User.findOne({ email: req.body.email });
  if (mail && !user) {
    return res.status(400).json({ message: "Email has been used!" });
  } else {
    // User Save
    const user: any = new User({
      name,
      surname,
      username,
      email,
      password,
    });

    // Role Setuo
    if (role) {
      const foundRoles = await Role.find({ role: { $in: role } });
      user.role = foundRoles.map((role) => role._id);
    } else {
      const role = await Role.findOne({ role: "user" });
      user.role = [role?._id];
    }

    // Company Setup
    if (company) {
      const foundCompany = await Company.find({ name: { $in: company } });
      user.company = foundCompany.map((company) => company._id);
    } else {
      const company = await Company.findOne({ name: "Test Company" });
      user.company = [company?._id];
    }

    // Password Encryption
    user.password = await user.encryptPassword(user.password);

    // Save New User
    const savedUser = await user.save();

    // Token
    const token: string = jwt.sign(
      { _id: savedUser._id },
      process.env.TOKEN_SECRET || "token_secret",
      {
        expiresIn: 28800, // Token duration "8" hours
      }
    );
    res.header("auth-token", token).json(token);
  }
};

export const signin = async (req: Request, res: Response) => {
  const user = await User.findOne({ username: req.body.username })
    .populate("role")
    .populate("company");
  if (!user) return res.status(400).json("User is wrong or not exits");

  const correctPassword: boolean = await user.validatePassword(
    req.body.password
  );
  if (!correctPassword) return res.status(400).json("Invalid Password");

  const token: string = jwt.sign(
    { _id: user._id },
    process.env.TOKEN_SECRET || "token_secret",
    {
      expiresIn: 28800, // Token duration "8" hours
    }
  );
  res.header("Authorization", token).json({token});
};

export const profile = async (req: Request, res: Response) => {
  const user = await User.findById(req.userId, { password: 0 })
    .populate("role")
    .populate("company");
  if (!user) return res.status(404).json("No User found");
  res.json(user);
};

export const roleType = async (req: Request, res: Response) => {
  const rol = await User.findById(req.userId, { password: 0 }).populate("role");
  if (!rol) return res.status(500).json("No Role Data");
  res.json(rol.role[0].role);
};

export const userType = async (req: Request, res: Response) => {
  const user = await User.findById(req.userId, { password: 0 });
  if (!user) return res.status(500).json("No User Provided");
  res.json(user.username);
};
