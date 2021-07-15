import mongoose, { Schema, Document } from "mongoose"

export interface IShipment extends Document {
    _id: string
    item: string[]
    contractor_id: string
    doc_id: string
    doc_date: string
    is_checked: boolean
    warehouse_id: string
    emp_id: string
    org_id: string
}

let shipmentSchema = new mongoose.Schema({
    _id: {
        type: Schema.Types.ObjectId
    },
    item: {
        type: String,
        required: true
    },
    contractor_id: {
        type: String,
        required: true
    },
    doc_id: {
        type: String,
        required: true
    },
    doc_date: {
        type: String,
        required: true
    },
    is_checked: {
        type: Boolean,
        default: "false"
    },
    warehouse_id: {
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
    }

})

export default mongoose.model<IShipment>("Shipment", shipmentSchema)
