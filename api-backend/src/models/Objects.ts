import { Schema, model, Document} from "mongoose";

export interface IObject extends Document {
    name: string;
}

const objectSchema = new Schema({
    name: String
},{
    versionKey: false,
    timestamps: true
})

export default model<IObject>('Object', objectSchema);