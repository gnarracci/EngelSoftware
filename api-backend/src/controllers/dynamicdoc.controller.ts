import { Request, Response } from "express";
import Template from "../models/Template";
import Fields from "../models/Fields";

export const getTemplates = async (req: Request, res: Response) => {
  try {
    const templates = await Template.find();
    if (templates.length > 0) {
      res.status(201).json(templates);
    }else{
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
}

export const nameTemplate = async (req: Request, res: Response) => {
  try {
    const template = await Template.findById(req.params.id);
    if (!template) throw new Error("Template not found");
    return res.status(201).json(template.label);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Something went Wrong!" });
  }
}

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
  const { is_container, fld_name, label, order, temp, requ, par, type } =
      req.body;

    const newfield = new Fields({
      is_container,
      fld_name,
      label,
      order,
      temp,
      requ,
      par,
      type,
    });

}