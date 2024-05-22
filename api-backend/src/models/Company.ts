import { Schema, model, Document} from "mongoose";

export interface ICompany extends Document {
    company_name: string;
    plant_type: string;
    plant_code: string;
    plant_name: string;
    address?: string;
    phone?: string;
}

const companySchema = new Schema({
    company_name: String,
    plant_type: String,
    plant_code: String,
    plant_name: String,
    address: String,
    phone: String
},{
    versionKey: false,
    timestamps: true
})

export default model<ICompany>('Company', companySchema);