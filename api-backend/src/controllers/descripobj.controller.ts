import { Request, Response } from "express";
import DescripObj from "../models/DescripObj";
import Company from "../models/Company";
import DescripTemplate from "../models/DescripTemplate";


export const getObjects = async (req: Request, res: Response) => {
    try {
      const objects = await DescripObj.find().populate("label").populate("company");
      if (objects.length > 0) {
        res.status(201).json(objects);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong!" });
    }
  };

  export const getObject = async (req: Request, res: Response) => {
    try {
      const objects = await DescripObj.findById(req.params.id)
        .populate("label")
        .populate("company");
      if (!objects) {
        res.status(404).json({ message: "Object wasn't found!" });
      } else {
        res.status(201).json(objects);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong!" });
    }
  };

  export const saveObject = async (req: Request, res: Response) => {
    const { code, descrip, label, company_name, adm } = req.body;
  
    //If previously exits
    const objects = await DescripObj.findOne({ name: req.body.label });
    if (objects)
      return res
        .status(400)
        .json({ message: "Object has already been registered!" });
  
    // Company Save
    const saveObject: any = new DescripObj({
      code,
      descrip,
      adm,
    });
  
    // Installation Type Setup Company
    if (company_name) {
      const foundComp = await Company.find({
        company_name: { $in: company_name },
      });
      saveObject.company = foundComp.map((company_name) => company_name.id);
    } else {
      const foundComp = await Company.findOne({ company_name: "example" });
      saveObject.company = [company_name?._id];
    }
  
    // Installation Type Setup Label
    if (label) {
      const foundTemp = await DescripTemplate.find({ label: { $in: label } });
      saveObject.label = foundTemp.map((label) => label._id);
    } else {
      const foundTemp = await DescripTemplate.findOne({ label: "example" });
      saveObject.label = [label?._id];
    }
  
    // Save new Obj
    try {
      console.log('TRY', saveObject);
      await saveObject.save();
      res.status(201).json({ message: "Description Object has been saved successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong!" });
    }
  };
  
  export const updateObject = async (req: Request, res: Response) => {
    try {
      const { adm } = req.body;
      console.log("ADM", adm);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong!" });
    }
  };
  
  export const deleteObject = async (req: Request, res: Response) => {
    try {
      let obj = await DescripObj.findById(req.params.id);
      if (!obj) {
        res.status(400).json({ message: "Template wasn't found!" });
      }
      await DescripObj.findOneAndRemove({ _id: req.params.id });
      res
        .status(200)
        .json({ message: "Description Object has been deleted successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong!" });
    }
  };
  export const getObjTemplate = async (req: Request, res: Response) => {
    try {
      const objects = await DescripObj.findById(req.params.id).populate("label");
      if (!objects) {
        res.status(404).json({ message: "Object wasn't found!" });
      } else {
        let oty = objects.label[0];
        let len = oty.folders;
        let lar = len.length;
        console.log(lar);
        res.status(201).json(objects.label[0]);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong!" });
    }
  };
  
  export const getObjTemplateLength = async (req: Request, res: Response) => {
    try {
      const objects = await DescripObj.findById(req.params.id).populate("label");
      if (!objects) {
        res.status(404).json({ message: "Object wasn't found!" });
      } else {
        let oty = objects.label[0];
        let len = oty.folders;
        let lar = len.length;
        res.status(201).json(lar);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong!" });
    }
  };
  
  export const getObjCompany = async (req: Request, res: Response) => {
    try {
      const objects = await DescripObj.findById(req.params.id).populate("company");
      if (!objects) {
        res.status(404).json({ message: "Object wasn't found!" });
      } else {
        res.status(201).json(objects.company[0]);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong!" });
    }
  };
  