import { Schema, model, Document} from "mongoose";

export interface IObject extends Document {
    code: string;
    descrip: string;
    inst_type: any;
    sdate: Date
}

const objectSchema = new Schema({
    code: String,
    descrip: String,
    inst_type: [{
        ref: "Template",
        type: Schema.Types.ObjectId
    }],
    sdate: Date
},{
    versionKey: false,
    timestamps: true
})

export default model<IObject>('Object', objectSchema);