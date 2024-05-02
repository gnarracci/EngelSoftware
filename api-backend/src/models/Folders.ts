import { Schema, model, Document, AnyArray} from "mongoose";

export interface IFolders extends Document {
    fld_name: string;
    formfield: any
}

const foldersSchema = new Schema({
    fld_name: String,
    formfield: []
        
},{
    versionKey: false
})

export default model<IFolders>('Folders', foldersSchema);