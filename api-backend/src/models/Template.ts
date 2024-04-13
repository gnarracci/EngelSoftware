import { Schema, model, Document} from "mongoose";
export interface ITemplate extends Document {
    label: string;
    fields: any;
}

const objectSchema = new Schema({
    label: String,
    children: [{
        ref: "Fields",
        type: Schema.Types.ObjectId
    }]    
},{
    versionKey: false,
    timestamps: true
})

export default model<ITemplate>('Template', objectSchema);