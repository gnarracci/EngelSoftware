import { Schema, model, Document} from "mongoose";

export interface IFields extends Document {
    name: string,
    order: number,
    type: string,
    req: boolean,
    container: boolean,
    evtitle: boolean,

}

const fieldsSchema = new Schema({
    name: String,
    order: Number,
    type: String,
    req: Boolean,
    container: Boolean,
    evtitle: Boolean
},{
    versionKey: false
})

export default model<IFields>('Fields', fieldsSchema);