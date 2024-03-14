import { Request, Response } from 'express';
import Objects from '../models/Objects';

 export const getObjects =  async (req:Request, res:Response) => {
    try {
        const objects = await Objects.find();
        if(objects.length > 0) {
        res.status(200).json(objects);
    }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong!"});
    }
 }

 export const getObject = async (req: Request, res: Response) => {
    try {
        const objects = await Objects.findById(req.params.id);
        if(!objects) {
        res.status(404).json({message: "Object wasn't found!"});
    }else{
        res.status(200).json(objects);
    }
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong!"})
    }
}

export const saveObject = async (req: Request, res: Response) => {
    const {name} = req.body;
    
    //If previously exits
    const objects = await Objects.findOne({name: req.body.name});
    if(objects) return res.status(400).json({ message: "Object name has been registered!"});

    // Company Save
    const saveObject: any = new Objects({
        name
    });

    // Save new company
    try {
        await saveObject.save();
        res.status(200).json({ message: "Object has been saved successfully!"});
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong!"});
    }
}