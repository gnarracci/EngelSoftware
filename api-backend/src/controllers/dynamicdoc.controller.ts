import { Request, Response } from "express";
import Template from "../models/Template";

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
