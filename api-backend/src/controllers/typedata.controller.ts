import { Request, Response } from "express";
import Type from "../models/Type";

export const getTypes = async (req: Request, res: Response) => {
  try {
    const types = await Type.find();
    if (types.length > 0) {
      res.status(200).json(types);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export const getType = async (req: Request, res: Response) => {
  try {
    const types = await Type.findById(req.params.id);
    if (!types) {
      res.status(404).json({ message: "Datatype wasn't found!" });
    } else {
      res.status(200).json(types);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export const saveType = async (req: Request, res: Response) => {
  const { type } = req.body;

  //If previously exits
  const types = await Type.findOne({ type: req.body.name });
  if (types)
    return res.status(400).json({ message: "Datatype has been registered!" });

  // Company Save
  const saveType: any = new Type({
    type,
  });

  // Save new company
  try {
    console.log('TYPE', saveType)
    //await saveType.save();
    res.status(200).json({ message: "Datatype has been saved successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};
