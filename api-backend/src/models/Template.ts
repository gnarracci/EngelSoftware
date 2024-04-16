import { Schema, model, Document} from "mongoose";
export interface ITemplate extends Document {
    label: string;
    folder: any;
}

const templateSchema = new Schema({
    label: String,
    children: [{
        ref: "Folder",
        type: Schema.Types.ObjectId
    }]    
},{
    versionKey: false,
    timestamps: true
})

export default model<ITemplate>('Template', templateSchema);