import { Schema, model, Document} from "mongoose";

export interface IPDF extends Document {
adm: string;
code:string;
company: string;
plant_code: string;
plant_name: string;
plant_type: string;
1: string;
2: string;
3: string;
4: string;
5: string;
6: string;
7: string;
8: string;
9: string;
10: string;
11: string;
12: string;
13: string;
14: string;
15: string;
}

const pdfSchema = new Schema({
    adm: String,
    code: String,
    company: String,
    plant_code: String,
    plant_name: String,
    plant_type: String,
    1: String,
    2: String,
    3: String,
    4: String,
    5: String,
    6: String,
    7: String,
    8: String,
    9: String,
    10: String,
    11: String,
    12: String,
    13: String,
    14: String,
    15: String,
},{
    versionKey: false
})

export default model<IPDF>('PDF', pdfSchema);