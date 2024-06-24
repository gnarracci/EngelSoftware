import { Request, Response } from 'express';
import PDF from "models/PDF";

export const createPDF = async (req: Request, res: Response) => {
    const { adm, code, company, plant_name, plant_type, plant_code } = req.body;
  
    // Role Save
    const savePdf: any = new PDF({
      adm,
      code,
      company,
      plant_name,
      plant_type,
      plant_code     

    });
  
    // Save new PDF
    try {
      await savePdf.save();
      res.status(201).json({ message: "PDF has been saved successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong!" });
    }
  };