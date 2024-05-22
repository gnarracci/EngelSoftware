import { Schema, model, Document} from "mongoose";

export interface IObject extends Document {
    code: string;
    descrip: string;
    company: any;
    adm: string;
    label: any;
}

const objectSchema = new Schema({
    code: String,
    descrip: String,
    company: [{
        ref: "Company",
        type: Schema.Types.ObjectId
    }],
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