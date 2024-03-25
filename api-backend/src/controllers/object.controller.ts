import { Request, Response } from "express";
import Objects from "../models/Objects";
import Fields from "../models/Fields";

export const getObjects = async (req: Request, res: Response) => {
  try {
    const objects = await Objects.find();
    if (objects.length > 0) {
      res.status(200).json(objects);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export const getObject = async (req: Request, res: Response) => {
  try {
    const objects = await Objects.findById(req.params.id);
    if (!objects) {
      res.status(404).json({ message: "Template wasn't found!" });
    } else {
      res.status(200).json(objects);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export const saveObject = async (req: Request, res: Response) => {
  const { name, build_user, edit_user, companies, type_obj } = req.body;

  //If previously exits
  const objects = await Objects.findOne({ name: req.body.name });
  if (objects)
    return res
      .status(400)
      .json({ message: "Template name has been registered!" });

  // Company Save
  const saveObject: any = new Objects({
    name,
    build_user,
    edit_user,
    companies,
    type_obj,
  });

  // Save new company
  try {
    await saveObject.save();
    res.status(200).json({ message: "Template has been saved successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export const updateObject = async (req: Request, res: Response) => {
  try {
    const { container, name, evtitle, label, order, temp, requ, par, type } =
      req.body;
    // Check if Object exits

    const newfield = new Fields({
      container,
      name,
      evtitle,
      label,
      order,
      temp,
      requ,
      par,
      type,
    });

    const query = { _id: req.params.id };

    const updateTemplate = { $push: { fields: newfield } };

    await Objects.updateOne(query, updateTemplate);
    res.status(201).json({ message: "The object field was updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export const deleteObject = async (req: Request, res: Response) => {
  try {
    let obj = await Objects.findById(req.params.id);
    if (!obj) {
      res.status(400).json({ message: "Template wasn't found!" });
    }
    await Objects.findOneAndRemove({ _id: req.params.id });
    res
      .status(200)
      .json({ message: "Template has been deleted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};
