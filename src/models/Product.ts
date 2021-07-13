import mongoose, { Schema, Document } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

export interface IProduct extends Document {
    _id: string
    org_id: string
    employee_id: string
    name: string
    description: string
    bar_code: string
    SKU: string
    photo: string
    unit: string
    category: string
    vendor_code: string
    weight: number
    volume: number
    VAT: number
    is_shared: boolean
    update_history: IProduct[]
}

const ProductSchema: Schema<IProduct> = new Schema({
    _id: {
        type: String,
        default: uuidv4
    },
    org_id: {
        type: String,
        required: true
    },
    employee_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    bar_code: {
        type: String
    },
    SKU: {
        type: String
    },
    photo: {
        type: String
    },
    unit: {
        type: String,
        ref: 'units'
    },
    category: {
        type: String,
        ref: 'categories'
    },
    vendor_code: {
        type: String
    },
    weight: {
        type: Number
    },
    volume: {
        type: Number
    },
    VAT: {
        type: Number
    },
    is_shared: {
        type: Boolean,
        default: true
    },
    update_history: [
        {
            type: Object,
            ref: 'products'
        }
    ]
})

export default mongoose.model<IProduct>('products', ProductSchema)
