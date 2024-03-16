import { Schema, model, Document} from "mongoose";

export interface ITemplate extends Document {
    companies: string;
    dma: string;
    fields?: string[]
}

const objectSchema = new Schema({
    companies: String,
    dma: String,
    fields: [String]
},{
    versionKey: false,
    timestamps: true
})

export default model<ITemplate>('Template', objectSchema);