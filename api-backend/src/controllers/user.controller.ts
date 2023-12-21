import { Request, Response } from "express";
import User from "../models/User";
import Role from "../models/Role";
import Company from "../models/Company";

export const listUsers = async (req: Request, res: Response) => {
  const users = await User.find();
  res.status(200).json(users);
};

export const getOne = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);
  res.status(200).json(user);
};

export const createUser = async (req: Request, res: Response) => {
  const { username, fullname, email, password, role, company } = req.body;

  // If User previously exits
  const user = await User.findOne({ username: req.body.username });
  if (user) return res.status(400).json({ message: "Username has been used!" });
  const mail = await User.findOne({ email: req.body.email });
  if (mail && !user) {
    return res.status(400).json({ message: "Email has been used!" });
  } else {
    // User Save
    const user: any = new User({
      username,
      fullname,
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

    res.status(200).json(savedUser);
  }
};

export const editUser = async (req: Request, res: Response) => {
  try {
    let user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found!" });

    const userUpdated = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ message: "User was updated successfully!" });
  } catch (error) {
    console.error(error);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const userDeleted = await User.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "User was deleted successfully!" });
};
