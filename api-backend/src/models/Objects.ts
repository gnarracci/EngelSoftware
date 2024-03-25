import { Schema, model, Document} from "mongoose";

export interface IObject extends Document {
    name: string;
    build_user: string;
    edit_user: string;
    type_obj: string,
    companies: string,
    fields: String[]
}

const objectSchema = new Schema({
    name: String,
    build_user: String,
    edit_user: String,
    companies: String,
    type_obj: String,
    fields: Array
},{
    versionKey: false,
    timestamps: true
})

export default model<IObject>('Object', objectSchema);