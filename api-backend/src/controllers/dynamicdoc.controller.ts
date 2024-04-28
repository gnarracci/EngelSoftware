import { Request, Response } from "express";
import Template from "../models/Template";
import Fields from "../models/Fields";
import Folders from "../models/Folders";
import Objects from "../models/Objects";

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

// Folders Scripts

export const getfolders = async (req: Request, res: Response) => {
  try {
    const folders = await Folders.find();
    if (folders.length > 0) {
      res.status(201).json(folders);
    } else {
      res.status(404).json({ message: "Folders not found!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export const newfolder = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const query = { _id: req.params.id };
    const folderName = new Folders({
      name,
    });
    const newfolder = { $push: { folders: folderName } };
    const result = await Template.updateOne(query, newfolder);
    console.log(result);
    res.status(201).json({ message: "Folder is saved successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Something went Wrong!" });
  }
};

// Fields Scripts

// No Folder
export const newfield = async (req: Request, res: Response) => {
  try {
    const { name, label, order, type, requ, par } = req.body;
    const query = { _id: req.params.id };
    const newfields = new Fields({
      name,
      label,
      order,
      type,
      requ,
      par,
    });
    const newfield = { $push: { folders: newfields } };
    await Template.updateOne(query, newfield);
    res.status(201).json({ message: "Fields have been added successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Something went Wrong!" });
  }
};

// With Folder
export const newfieldwithfolder = async (req: Request, res: Response) => {
  try {
    const { name, label, order, type, requ, par } = req.body;
    const filter = { _id: req.params.id };
    const newfields = new Fields({
      name,
      label,
      order,
      type,
      requ,
      par,
    });
    const newfield = { $push: { "folders.1.formfield": newfields}};
    await Template.updateMany(filter, newfield);
    res.status(201).json({ message: "Fields have been added successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Something went wrong!" });
  }
};
