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
    const {name, plant_type, plant_code, plant_name, strat_management_day, end_management_day} = req.body;
    console.log(req.body);
}