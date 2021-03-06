import mongoose, { Schema, Document } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
import { IProduct } from './Product'

export interface IItem extends Document {
    _id: string
    org_id: string
    emp_id: string
    product_id: string | IProduct
    cost: number
    quantity: number
}

let itemSchema = new mongoose.Schema(
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
        product_id: {
            type: String,
            required: true,
            ref: 'products'
        },
        cost: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model<IItem>('items', itemSchema)
