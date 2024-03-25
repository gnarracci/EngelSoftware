import { Request, Response } from "express";
import Fields from "../models/Fields";


export const createField = async (req: Request, res: Response) => {
    try {
      const { container, evtitle, order, label, temp, type, par, requ, name } = req.body;
      // Check if the user already exists in the database
      let existingField = await Fields.findOne({ name: Fields });
      if (existingField) throw new Error("This Field already exists");
  
      const newField = await Fields.create(req.body);
      return res.status(201).json(newField);
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Something went Wromg!" });
    }
  };