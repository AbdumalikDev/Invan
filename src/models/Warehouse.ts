import mongoose, { Schema, Document } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

export interface IWarehouse extends Document {
    _id: string
    org_id: string
    emp_id: string
    name: string
    group: string[]
}

let warehouseSchema = new mongoose.Schema(
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
        group: [{
            type: String,
            ref:"warehouse"
        }]
    },
    {
        timestamps: true
    }
)

export default mongoose.model<IWarehouse>('warehouses', warehouseSchema)
