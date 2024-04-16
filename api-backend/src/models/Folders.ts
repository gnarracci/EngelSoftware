import { Schema, model, Document} from "mongoose";

export interface IFolder extends Document {
    folder: string;
    fields: any;
}

const folderSchema = new Schema({
    folder: String,
    fields: [{
        ref: "Fields",
        type: Schema.Types.ObjectId
    }]
},{
    versionKey: false
})

export default model<IFolder>('Folder', folderSchema);