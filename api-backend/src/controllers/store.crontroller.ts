import { Request, Response } from "express";
import Objdyn from "../models/Objdyn";

export const savedyn = async (req: Request, res: Response) => {
  const pr = req.body;

  const doc = new Objdyn({ pdfData: pr });

  // Save Template
  try {
    await doc.save();
    res.status(201).json({ message: "Template has been saved successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export const getdyn = async (req: Request, res: Response) => {
  try {
    const dyn = await Objdyn.find();
    if (dyn.length > 0) {
      res.status(200).json(dyn);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export const getOnedyn = async (req: Request, res: Response) => {
  try {
    const dyn = await Objdyn.findById(req.params.id);
    if(!dyn) {
    res.status(404).json({message: "Template wasn't found!"});
}else{
    res.status(200).json(dyn);
}
} catch(error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong!"})
}
}
