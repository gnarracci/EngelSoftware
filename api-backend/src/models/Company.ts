import { Schema, model, Document} from "mongoose";

export interface ICompany extends Document {
    name: string
}

const companySchema = new Schema({
    name: String
},{
    versionKey: false
})

export default model<ICompany>('Company', companySchema);