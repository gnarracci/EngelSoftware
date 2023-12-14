import { Schema, model, Document, AnyArray } from "mongoose";

export interface IRole extends Document {
    name: string
}

const roleSchema = new Schema({
    name: String
},{
    versionKey: false
})

export default model<IRole>('Role', roleSchema);