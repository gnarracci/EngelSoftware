import { Request, Response } from "express";
import User from "../models/User";
import Role from "../models/Role";
import Company from "../models/Company";
import jwt from "jsonwebtoken";

export const signup = async (req: Request, res: Response) => {
  const { username, email, password, role, company } = req.body;

  // If User previously exits
  const user = await User.findOne({ username: req.body.username });
  if (user) return res.status(400).json({ message: "Username has benn used!" });
  const mail = await User.findOne({ email: req.body.email });
  if (mail && !user) {
    return res.status(400).json({ message: "Email has been used." });
  } else {
    // User Save
    const user: any = new User({
      username,
      email,
      password,
    });

    // Role Setuo
    if (role) {
      const foundRoles = await Role.find({ name: { $in: role } });
      user.role = foundRoles.map((role) => role._id);
    } else {
      const role = await Role.findOne({ name: "user" });
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
    res.header("auth-token", token).json(savedUser);
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
  res.header("auth-token", token).json(user);
};

export const profile = async (req: Request, res: Response) => {
  const user = await User.findById(req.userId, { password: 0 })
    .populate("role")
    .populate("company");
  if (!user) return res.status(404).json("No User found");
  res.json(user);
};
