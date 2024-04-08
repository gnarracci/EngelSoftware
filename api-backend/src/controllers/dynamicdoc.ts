import { Request, Response } from "express";
import Template from "../models/Template";

export const saveTemplate = async (req: Request, res: Response) => {
  const { name_templ } =
    req.body;

  // Save Template
  const saveTempl: any = new Template({
    name_templ
  });

  try {
    await saveTempl.save();
    res.status(201).json({ message: "Template has been saved." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong!." });
  }
};
