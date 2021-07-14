import mongoose, { Schema, Document } from "mongoose"

export interface IIncome extends Document {
    _id: string
    doc_id: string
    payment_type: string[]
    emp_id: string
    org_id: string
    sum: number
}

let incomeSchema = new mongoose.Schema({
    _id: {
        type: Schema.Types.ObjectId
    },
    doc_id: {
        type: String,
        required: true
    },
    payment_type: {
        type: String,
        required: true
    },
    emp_id: {
        type: String,
        required: true
    },
    org_id: {
        type: String,
        required: true
    },
    sum: {
        type: Number,
        required: true
    }
})

export default mongoose.model<IIncome>("Income", incomeSchema)
