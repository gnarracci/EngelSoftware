import { Schema, model, Document} from "mongoose";

export interface IPfddataform extends Document {
    pdfdataform?:any;
}

const PdfdataformSchema = new Schema({
    pdfDataform: { type: Schema.Types.Mixed }
},{
    versionKey: false,
    timestamps: true
})

export default model<IPfddataform>('Objdyn', PdfdataformSchema);