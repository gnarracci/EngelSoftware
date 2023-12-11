import { Schema, model, Document } from "mongoose";

export interface IRole extends Document {
    role: string
}

const roleSchema = new Schema({
    role: String
},{
    versionKey: false
})