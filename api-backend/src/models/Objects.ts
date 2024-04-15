import { Schema, model, Document} from "mongoose";

export interface IObject extends Document {
    code: string;
    descrip: string;
    company: string;
    adm: string;
    label: any;
}

const objectSchema = new Schema({
    code: String,
    descrip: String,
    company: String,
    adm: String,
    label: [{
        ref: "Template",
        type: Schema.Types.ObjectId
    }]
},{
    versionKey: false,
    timestamps: true
})

export default model<IObject>('Object', objectSchema);