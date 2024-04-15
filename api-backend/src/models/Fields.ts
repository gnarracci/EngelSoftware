import { Schema, model, Document} from "mongoose";
export interface IFields extends Document {
    name: string;
    is_container: boolean;
    label: string;
    order: number;
    type: string;
    requ: boolean;
    par: string;
}

const fieldsSchema = new Schema({
    name: String,
    is_container: Boolean,
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