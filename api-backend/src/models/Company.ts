import { Schema, model, Document} from "mongoose";

export interface ICompany extends Document {
    name: string;
    plant_type: string;
    plant_code: string;
    plant_name: string;
    address?: string;
    phone?: string;
}

const companySchema = new Schema({
    name: String,
    plant_type: String,
    plant_code: String,
    plant_name: String,
    adress: String,
    phone: String
},{
    versionKey: false,
    timestamps: true
})

export default model<ICompany>('Company', companySchema);