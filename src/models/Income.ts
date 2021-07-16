import mongoose, { Schema, Document } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

export interface IIncome extends Document {
    _id: string
    org_id: string
    emp_id: string
    doc_id: string
    payment_type: string[]
    sum: number
}

let incomeSchema = new mongoose.Schema(
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
        doc_id: {
            type: String
        },
        payment_type: {
            type: String,
            required: true
        },
        sum: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model<IIncome>('Income', incomeSchema)
