import mongoose, { Schema, Document } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

export interface IShipment extends Document {
    _id: string
    org_id: string
    emp_id: string
    warehouse_id: string
    contractor_id: string
    item: string[]
    doc_id: string
    doc_date: string
    is_checked: boolean
}

let shipmentSchema = new mongoose.Schema(
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
            required: true
        },
        contractor_id: {
            type: String,
            required: true
        },
        products: [
            {
                product_id: {
                    type: String,
                    ref: 'products'
                },
                quantity: {
                    type: Number,
                    required: true
                },
                cost: {
                    type: Number,
                    required: true
                }
            }
        ],
        doc_id: {
            type: String
        },
        doc_date: {
            type: String,
            required: true
        },
        is_checked: {
            type: Boolean,
            default: 'false'
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model<IShipment>('Shipment', shipmentSchema)
