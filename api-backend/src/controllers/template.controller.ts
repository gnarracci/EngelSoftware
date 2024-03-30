import { Request, Response } from 'express';
import Template from '../models/Template';

export const saveTemplate = async (res: Response, req: Request) => {
    const { companies, dma, fields} = req.body;
    console.log('TEMP', req.body);
}

export const deleteTemplate = async (req: Request, res: Response) => {
    try {
      let temp = await Template.findById(req.params.id);
      if (!temp) throw new Error("Template wasn't found!");
      await Template.findOneAndDelete({ _id: req.params.id });
      res.status(200).json({ message: "Template has been deleted successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong!" });
    }
  };

export const searcher = async  (req:Request, res:Response) => {
  
}