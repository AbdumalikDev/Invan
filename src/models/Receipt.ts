import mongoose, { Schema, Document } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

export interface IReceipt extends Document {
    _id: string
    org_id: string
    emp_id: string
    warehouse_id: string
    contractor_id: string
    items: string[]
    doc_id: string
    is_checked: boolean
}

const ReceiptSchema = new Schema(
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
        warehouse_id: {
            type: String,
            required: true,
            ref: 'warehouses'
        },
        contractor_id: {
            type: String,
            required: true,
            ref: 'contractors'
        },
        items: [
            {
                type: String,
                ref: 'items'
            }
        ],
        doc_id: {
            type: String
        },
        is_checked: {
            type: Boolean,
            required: true
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model<IReceipt>('receipts', ReceiptSchema)
