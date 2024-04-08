import { Schema, model, Document} from "mongoose";
export interface IFields extends Document {
    fld_name: string;
    is_container: boolean;
    order: number;
    type: string;
    requ: boolean;
    par: string;
}

const objectSchema = new Schema({
    fld_name: String,
    is_container: Boolean,
    order: Number,
    type: String,
    requ: Boolean,
    par: String
},{
    versionKey: false,
    timestamps: true
})

export default model<IFields>('Template', objectSchema);