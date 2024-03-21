import { Schema, model, Document} from "mongoose";

export interface IType extends Document {
    type: string
}

const roleSchema = new Schema({
    type: String
},{
    versionKey: false
})

export default model<IType>('Type', roleSchema);