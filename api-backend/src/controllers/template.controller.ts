import { Request, Response } from 'express';
import Template from '../models/Template';

export const saveTemplate = async (res: Response, req: Request) => {
    const { companies, dma, fields} = req.body;
    console.log('TEMP', req.body);
} 