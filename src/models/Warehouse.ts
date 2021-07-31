import mongoose, { Schema, Document } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

export interface IWarehouse extends Document {
    _id: string
    org_id: string
    emp_id: string
    name: string
    address: string
    sub_warehouses: string[]
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
        address: {
            type: String,
            required: true
        },
        sub_warehouses: [
            {
                type: String,
                ref: 'warehouses'
            }
        ]
    },
    {
        timestamps: true
    }
)

export default mongoose.model<IWarehouse>('warehouses', warehouseSchema)
