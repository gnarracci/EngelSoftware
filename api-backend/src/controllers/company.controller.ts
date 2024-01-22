import { Request, Response } from 'express';
import Company from '../models/Company';

export const getCompanies = async (req: Request, res: Response) => {
    const companies = await Company.find();
    if(companies.length > 0) {
        res.status(200).json(companies);
    }else{
        res.status(404).json({message: "Companies isn't found!"});
    }
}

export const getCompany = async (req: Request, res: Response) => {
    const company = await Company.findById(req.params.id);
    if(!company) {
        res.status(404).json({message: "Company ins't found!"});
    }else{
        res.status(200).json(company);
    }
}

export const saveCompany = async (req: Request, res: Response) => {
    const {name, plant_type, plant_code, plant_name, address, phone} = req.body;
    
    //If previously exits
    const company = await Company.findOne({name: req.body.name});
    if(company) return res.status(400).json({ message: "Company name has been registered!"});

    // Company Save
    const companySave: any = new Company({
        name,
        plant_type,
        plant_code,
        plant_name,
        address,
        phone
    });

    // Save new company
    try {
        await companySave.save();
        res.status(200).json({ message: "New company saved successfully!"});
    } catch(error) {
        console.error(error);
        res.status(400).json({ message: "Something wen't wrong!"});
    }
}

export const updateCompany = async (req: Request, res: Response) => {
    try {
        await Company.findByIdAndUpdate(req.params.id, req.params, {
            new: true,
            runValidators: true
        });
        res.status(200).json({ message: "Company has been updated!"});
    } catch(error) {
        console.error(error)
    }
}

export const deleteCompany = async (req: Request, res: Response) => {    
    await Company.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Deleted has been deleted!' });
}