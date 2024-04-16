import { Schema, model, Document} from "mongoose";
export interface IFields extends Document {
    name: string;
    label: string;
    order: number;
    type: string;
    requ: boolean;
    par: string;
}

const fieldsSchema = new Schema({
    name: String,
    label: String,
    order: Number,
    type: String,
    requ: Boolean,
    par: String
},{
    versionKey: false,
    timestamps: true
})

export default model<IFields>('Fields', fieldsSchema);