import { Schema, model, Document} from "mongoose";

export interface IFolder extends Document {
    label: string
}

const folderSchema = new Schema({
    label: String
},{
    versionKey: false,
    timestamps: true
})

export default model<IFolder>('Folder', folderSchema);