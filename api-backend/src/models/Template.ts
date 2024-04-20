import { Schema, model, Document} from "mongoose";
export interface ITemplate extends Document {
    label: string;
    folders: any;
}

const templateSchema = new Schema({
    label: String,
    folders: []    
},{
    versionKey: false,
    timestamps: true
})

export default model<ITemplate>('Template', templateSchema);