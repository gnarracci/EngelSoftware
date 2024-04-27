import { Schema, model, Document, AnyArray} from "mongoose";

export interface IFolders extends Document {
    name: string;
    formfield: any
}

const foldersSchema = new Schema({
    name: String,
    formfield: []
        
},{
    versionKey: false
})

export default model<IFolders>('Folders', foldersSchema);