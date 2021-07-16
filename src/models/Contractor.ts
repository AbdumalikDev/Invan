import mongoose, { Schema, Document } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

export interface IContractor extends Document {
    _id: string
    org_id: string
    emp_id: string
    name: string
    address: string
    contract: string
    email: string
    phone_number: string
    group: string[]
}

let contractorSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: uuidv4
        },
        org_id: {
            type: String,
            required: true
        },
        emp_id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        address: {
            type: String
        },
        contract: {
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
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model<IContractor>('contractors', contractorSchema)
