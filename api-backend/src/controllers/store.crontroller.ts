import { Request, Response } from "express";
import Objdyn from "../models/Objdyn";

export const savedyn = async (req: Request, res: Response) => {
  const pr = req.body;
  console.log(pr);

  const doc = new Objdyn({ pdfData: pr });

  // Save Template
  try {
    await doc.save();
    const ident = await Objdyn.find().sort({ createdAt: -1 }).limit(1);
    res.status(201).json(ident[0]._id);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export const updatedyn = async (res: Response, req: Request) => {
  try {
    const id = { _id: req.params.id };
    const pu = req.body;

    let pdf = await Objdyn.findById(req.params.id);
    if(!pdf) {
      return res.status(404).json({ message: "PDF wasn't located!"});
  }
    // await Objdyn.updateOne(
    //   { id: id },
    //   { $set: { pdfdataform: pu } },
    // );
    // res.status(201).json({ message: "Data Form has been updated!"});
  } catch(error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
} 

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

export const getOnedynPDF = async (req: Request, res: Response) => {
  try {
    const dyn = await Objdyn.findById(req.params.id);
    if(!dyn) {
    res.status(404).json({message: "Template wasn't found!"});
}else{
    res.status(200).json(dyn.pdfData);
}
} catch(error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong!"})
}
}


export const deleteDyn = async (req: Request, res: Response) => {
  try {
    let comp = await Objdyn.findById(req.params.id);
    if(!comp) {
        res.status(400).json({ message: "Document wasn't found!"});
    }
    await Objdyn.findOneAndRemove({_id:req.params.id});
    res.status(200).json({ message: "Document has been deleted successfully!"});
} catch(error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong!"})
}
}
