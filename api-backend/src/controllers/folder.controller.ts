import { Request, Response } from "express";
import Folders from "../models/Folders";

export const getFolders = async (req: Request, res: Response) => {
    try {
      const folders = await Folders.find();
      if (folders.length > 0) {
        res.status(201).json(folders);
      }else{
        res.status(404).json({ message: "Folders not found!" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong!" });
    }
  };

export const saveFolder = async (req: Request, res: Response) => {
    const { label } = req.body;
  
    // Save Template
    const saveFolder: any = new Folders({
      label,
    });
  
    try {
      await saveFolder.save();
      res.status(201).json({ message: "Folder has been saved." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong!." });
    }
  };