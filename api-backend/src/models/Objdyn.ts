import { Schema, model, Document} from "mongoose";

export interface IObjdyn extends Document {
    pdfData?:any;
    pdfdataform?:any;
}

const ObjdynSchema = new Schema({
    pdfData: { type: Schema.Types.Mixed },
    pdfdataform: [{ 
        ref: 'Pdfdataform',
        type: Schema.Types.Mixed }]
},{
    versionKey: false,
    timestamps: true
})

export default model<IObjdyn>('Objdyn', ObjdynSchema);