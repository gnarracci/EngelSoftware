import { Schema, model, Document} from "mongoose";
export interface IFields extends Document {
    fld_name: string;
    label: string;
    order: number;
    type: string;
    requ: boolean;
    par: string;
}

const fieldsSchema = new Schema({
    fld_name: String,
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