import { Request, Response } from 'express';
import Company from '../models/Company';

export const getCompanies = async (req: Request, res: Response) => {
    try {
        const companies = await Company.find();
        if(companies.length > 0) {
        res.status(200).json(companies);
    }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong!"});
    }
}

export const getCompany = async (req: Request, res: Response) => {
    try {
        const company = await Company.findById(req.params.id);
        if(!company) {
        res.status(404).json({message: "Company wasn't found!"});
    }else{
        res.status(200).json(company);
    }
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong!"})
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
        res.status(200).json({ message: "Company has been saved successfully!"});
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong!"});
    }
}

export const updateCompany = async (req: Request, res: Response) => {
    try {
        const { name, plant_name, plant_code, plant_type, address, phone } = req.body;
        let comp = await Company.findById(req.params.id);
        if(!comp) {
            return res.status(404).json({ message: 'Company not found!'});
        }
        comp.name = name;
        comp.plant_name = plant_name;
        comp.address = address;
        comp.phone = phone;
        comp.plant_code = plant_code;
        comp.plant_type = plant_type;

        comp = await Company.findOneAndUpdate({_id: req.params.id}, comp, {new:true})
        res.status(201).json({ message: "Company has been updated successfully!"});

    } catch(error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong!"});
    }
}

export const deleteCompany = async (req: Request, res: Response) => {    
    try {
        let comp = await Company.findById(req.params.id);
        if(!comp) {
            res.status(400).json({ message: "Company wasn't found!"});
        }
        await Company.findOneAndRemove({_id:req.params.id});
        res.status(200).json({ message: "Company has been deleted successfully!"});
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong!"})
    }
}