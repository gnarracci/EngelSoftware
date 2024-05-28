import { Request, Response } from "express";
import Fields from "../models/Fields";
import Folders from "../models/Folders";
import DescripTemplate from "../models/DescripTemplate";

export const getTemplates = async (req: Request, res: Response) => {
  try {
    const templates = await DescripTemplate.find();
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
    const template = await DescripTemplate.findById(req.params.id);
    if (!template) throw new Error("Template not found");
    return res.status(201).json(template);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Something went Wrong!" });
  }
};

// Get Length of Template.folders
export const getlengthTemplate = async (req: Request, res: Response) => {
  try {
    const template = await DescripTemplate.findById(req.params.id);
    if (!template) throw new Error("Template not found");
    let te = template.folders;
    let fr = te.length;
    res.status(201).json(fr);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Something went Wrong!" });
  }
};

export const getFolders = async (req: Request, res: Response) => {
  try {
    const template = await DescripTemplate.findById(req.params.id);
    if (!template) throw new Error("Folders not found");

    
    return res.status(201).json(template.folders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Something went Wrong!" });
  }
};

export const nameTemplate = async (req: Request, res: Response) => {
  try {
    const template = await DescripTemplate.findById(req.params.id);
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
  const saveTempl: any = new DescripTemplate({
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

export const updateTemplate = async (req: Request, res: Response) => {
  try {
    const { label } = req.body;
    let templa = await DescripTemplate.findById(req.params.id);
    if(!templa) throw new Error("Template not found");

    templa.label = label;

  templa = await DescripTemplate.findOneAndUpdate({_id: req.params.id }, templa, { new: true });
  res.status(201).json({ message: "Template has been updated!"})
  } catch(error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong!." });
  }
}

export const deleteTemplate = async (req: Request, res: Response) => {
  try {
    let comp = await DescripTemplate.findById(req.params.id);
    if (!comp) throw new Error("The Template is not available");
    await DescripTemplate.findOneAndRemove({ _id: req.params.id });
    res
      .status(201)
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
// New Folder
export const newfolder = async (req: Request, res: Response) => {
  try {
    const { fld_name } = req.body;
    const query = { _id: req.params.id };
    const folderName = new Folders({
      fld_name,
    });
    const newfolder = { $push: { folders: folderName } };
    const result = await DescripTemplate.updateOne(query, newfolder);
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
    const { fld_name, label, order, type, requ, par } = req.body;
    const query = { _id: req.params.id };
    const newfields = new Fields({
      fld_name,
      label,
      order,
      type,
      requ,
      par,
    });
    const newfield = { $push: { folders: newfields } };
    await DescripTemplate.updateOne(query, newfield);
    res.status(201).json({ message: "Field have been added successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Something went Wrong!" });
  }
};

// Fields under Folder
export const newfieldsuaF = async (req: Request, res: Response) => {
  try {
    // Get Input Information
    const { fld_name, label, order, type, requ, par } = req.body;
    // Get Template ID
    const filter = { _id: req.params.id };
    // Input Form
    const newfields = new Fields({
      fld_name,
      label,
      order,
      type,
      requ,
      par,
    });

    let ord = newfields.order;

    // Set position to save object on Folders Array
    let temp_options: Record<string, string> = {
      "1": "folders.0.formfield",
      "2": "folders.1.formfield",
      "3": "folders.2.formfield",
      "4": "folders.3.formfield",
      "5": "folders.4.formfield",
      "6": "folders.5.formfield",
      "7": "folders.6.formfield",
      "8": "folders.7.formfield",
      "9": "folders.8.formfield",
      "10": "folders.9.formfield",
      "11": "folders.10.formfield",
      "12": "folders.11.formfield",
      "13": "folders.12.formfield",
      "14": "folders.13.formfield",
      "15": "folders.14.formfield",
    };

    const opt_default = "0";

    const opt = temp_options[ord] || opt_default;

    const newfield = { $push: { [opt]: newfields } };
    await DescripTemplate.updateOne(filter, newfield);
    res
      .status(201)
      .json({
        message:
          "Subfield has have been added successfully to selected folder!",
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Something went wrong!" });
  }
};

export const deleteFolder = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Something went Wrong!" });
  }
};

export const newsubfolder = async (req: Request, res: Response) => {
  try {
    const { fld_name } = req.body;
    const query = { _id: req.params.id };
    const folderName = new Folders({
      fld_name,
    });
    const newfolder = { $push: { "folders.2.formfield": folderName } };
    const result = await DescripTemplate.updateOne(query, newfolder);
    console.log(result);
    res.status(201).json({ message: "Subfolder is saved successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Something went Wrong!" });
  }
};
