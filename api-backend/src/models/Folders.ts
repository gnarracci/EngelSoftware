import { Schema, model, Document, AnyArray} from "mongoose";

export interface IFolders extends Document {
    name: string;
    fields: any;
}

const foldersSchema = new Schema({
    name: String,
    fields: []
        
},{
    versionKey: false
})

export default model<IFolders>('Folders', foldersSchema);