import { Schema, model, Document} from "mongoose";

export interface IObjdyn extends Document {
    pdfData?:any
}

const ObjdynSchema = new Schema({
    pdfData: { type: Schema.Types.Mixed }   
},{
    versionKey: false,
    timestamps: true
})

export default model<IObjdyn>('Objdyn', ObjdynSchema);