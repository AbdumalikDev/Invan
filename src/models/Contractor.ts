import mongoose, { Schema, Document } from "mongoose"

export interface IContractor extends Document {
    _id: string
    name: string
    address: string
    contract: string
    email: string
    phone_number:string
    group: string[]
    org_id: string
    emp_id: string
}

let contractorSchema = new mongoose.Schema({
    _id: {
        type: Schema.Types.ObjectId
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    contrcat: {
        type: String
    },
    email: {
        type: String
    },
    phone_number: {
        type: String
    },
    group: {
        type: String
    },
    org_id: {
        type: String,
        required: true
    },
    emp_id: {
        type: String,
        required: true
    }
})

export default mongoose.model<IContractor>("Contractor", contractorSchema)
