import { Schema, model, Document} from "mongoose";
export interface IDescripTemplate extends Document {
    label: string;
    folders: any;
}

const descriptemplateSchema = new Schema({
    label: String,
    folders: []    
},{
    versionKey: false,
    timestamps: true
})

export default model<IDescripTemplate>('DescripTemplate', descriptemplateSchema);