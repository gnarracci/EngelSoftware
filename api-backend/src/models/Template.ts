import { Schema, model, Document} from "mongoose";
export interface ITemplate extends Document {
    name_templ: String,
    fields: [{
        ref: "Fields",
        type: Schema.Types.ObjectId
    }]
}

const objectSchema = new Schema({
    name_templ: String    
},{
    versionKey: false,
    timestamps: true
})

export default model<ITemplate>('Template', objectSchema);