import mongoose, { Schema, Document } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
import autopopulate from 'mongoose-autopopulate'

export interface IWarehouse extends Document {
    _id: string
    org_id: string
    emp_id: string
    name: string
    address: string
    sub_warehouses: string[]
    parent_warehouse: string
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
                ref: 'warehouses',
                autopopulate: true
            }
        ],
        parent_warehouse: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

warehouseSchema.plugin(autopopulate)

export default mongoose.model<IWarehouse>('Warehouse', warehouseSchema)
