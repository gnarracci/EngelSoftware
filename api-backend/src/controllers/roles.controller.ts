import { Request, Response } from "express";
import Role from "../models/Role";

export const getRoles = async (req: Request, res: Response) => {
  try {
    const roles = await Role.find();
    if (!roles || roles.length === 0) throw new Error("No Roles Found");
    return res.status(201).json(roles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Something went Wrong!" });
  }
};

export const getRole = async (req: Request, res: Response) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role) throw new Error("Role not found");
    return res.status(201).json(role);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Something went Wrong!" });
  }
};
export const createRole = async (req: Request, res: Response) => {
  try {
    const name = req.params.name;
    // Check if the user already exists in the database
    let existingRole = await Role.findOne({ role: role });
    if (existingRole) throw new Error("This Role already exists");

    const newRole = await Role.create(req.body);
    return res.status(201).json(newRole);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Something went Wromg!" });
  }
};
export const updateRole = async (req: Request, res: Response) => {
  try {
    const role = req.body;
    let idRole = await Role.findById(req.params.id);
    if (!idRole) throw new Error("The Role is not available");
    idRole.role = role;
    idRole = await Role.findOneAndUpdate({ _id: req.params.id }, role, {
      new: true,
    });
    res.status(201).json({ message: "Role has been updated!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Something went Wrong!" });
  }
};
export const deleteRole = async (req: Request, res: Response) => {
  try {
    let comp = await Role.findById(req.params.id);
    if (!comp) throw new Error("The Role is not available");
    await Role.findOneAndRemove({ _id: req.params.id });
    res.status(200).json({ message: "Role has been deleted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Something went Wrong!" });
  }
};
