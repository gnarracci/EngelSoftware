import { Schema, model, Document} from "mongoose";

export interface IFields extends Document {
    name: string,
    order: number,
    type: string,
    label: string,
    requ: boolean,
    container: boolean,
    evtitle: boolean,
    temp: string
}

const fieldsSchema = new Schema({
    name: String,
    order: Number,
    label: String,
    type: String,
    requ: Boolean,
    container: Boolean,
    evtitle: Boolean,
    temp: String,
    SubFields: []
},{
    versionKey: false
})

export default model<IFields>('Fields', fieldsSchema);