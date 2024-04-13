import { Request, Response } from "express";
import User from "../models/User";
import Role from "../models/Role";
import Company from "../models/Company";

export const listUsers = async (req: Request, res: Response) => {
  const users = await User.find().populate("role").populate("company");
  res.status(200).json(users);
};

export const getOne = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id)
    .populate("role")
    .populate("company");
  res.status(200).json(user);
};

export const createUser = async (req: Request, res: Response) => {
  const { username, name, surname, email, password, role, company } = req.body;

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
      name,
      surname,
      email,
      password,
    });

    // Role Setup
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

    res.status(200).json(savedUser);
  }
};

export const editUser = async (req: Request, res: Response) => {
  try {
    const { username, name, surname, email, password, role, company } =
      req.body;
    let us = await User.findById(req.params.id);
    if (!us) throw new Error("User not found");
    us.username = username;
    us.name = name;
    us.surname = surname;
    us.email = email;
    us.password = password;
    us.role = role;
    us.company = company;

    console.log(us);

    await User.findOneAndUpdate({ _id: req.params.id }, us, { new: true });
    res.status(201).json({ message: "User has been updated successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    let us = await User.findById(req.params.id);
    if (!us) throw new Error("User not found!");
    await User.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({ message: "User has been deleted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};
