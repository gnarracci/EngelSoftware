import { Request, Response } from "express";
import Template from "../models/Template";
import Fields from "../models/Fields";
import Folders from "../models/Folders";

export const getTemplates = async (req: Request, res: Response) => {
  try {
    const templates = await Template.find();
    if (templates.length > 0) {
      res.status(201).json(templates);
    } else {
      res.status(404).json({ message: "Templates not found!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export const getTemplate = async (req: Request, res: Response) => {
  try {
    const template = await Template.findById(req.params.id);
    if (!template) throw new Error("Template not found");
    return res.status(201).json(template);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Something went Wrong!" });
  }
};

export const nameTemplate = async (req: Request, res: Response) => {
  try {
    const template = await Template.findById(req.params.id);
    if (!template) throw new Error("Template not found");
    return res.status(201).json(template.label);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Something went Wrong!" });
  }
};

export const saveTemplate = async (req: Request, res: Response) => {
  const { label } = req.body;

  // Save Template
  const saveTempl: any = new Template({
    label,
  });

  try {
    await saveTempl.save();
    res.status(201).json({ message: "Template has been saved." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong!." });
  }
};

export const saveFields = async (req: Request, res: Response) => {
  const { is_container, fld_name, label, order, requ, par, type } = req.body;

  const newfield = new Fields({
    is_container,
    fld_name,
    label,
    order,
    requ,
    par,
    type,
  });

  console.log("FORM", newfield);
};

export const deleteTemplate = async (req: Request, res: Response) => {
  try {
    let comp = await Template.findById(req.params.id);
    if (!comp) throw new Error("The Template is not available");
    await Template.findOneAndRemove({ _id: req.params.id });
    res
      .status(200)
      .json({ message: "Template has been deleted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Something went Wrong!" });
  }
};

// Folders

export const newfolder = async (req: Request, res: Response) => {
  try {
    const { label } = req.body;
    const newfolder = new Folders({
      label,
    });
    const id = { _id: req.params.id };
    const folder = { $push: { children: newfolder } };
    await Template.updateOne(id, folder);
    res.status(201).json({ message: "Folder is saved successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Something went Wrong!" });
  }
};
