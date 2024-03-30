import { Schema, model, Document} from "mongoose";

export interface ISubFields extends Document {
    name: string,
    order: number,
    type: string,
    label: string,
    requ: boolean,
    container: boolean,
    evtitle: boolean,
    temp: string
}

const subfieldsSchema = new Schema({
    name: String,
    order: Number,
    type: String,
    label: String,
    requ: Boolean,
    container: Boolean,
    evtitle: Boolean,
    temp: String
},{
    versionKey: false
})

export default model<ISubFields>('SubFields', subfieldsSchema);