import mongoose, { Schema, Document } from "mongoose"

export interface IItem extends Document {
    _id: string
    product_id: string
    emp_id: string
    cost: number
    quantity: number
    org_id: string
}

let itemSchema = new mongoose.Schema({
    _id: {
        type: Schema.Types.ObjectId
    },
    product_id: {
        type: String,
        required: true
    },
    emp_id: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    org_id: {
        type: String,
        required: true
    }
})

export default mongoose.model<IItem>("Item", itemSchema)
