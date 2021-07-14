import mongoose, { Schema, Document } from "mongoose"

export interface IWarehouse extends Document {
    _id: string
    name: string
    group: string[]
    org_id: string
    emp_id: string
}

let warehouseSchema = new mongoose.Schema({
    _id: {
        type: Schema.Types.ObjectId
    },
    name: {
        type: String,
        required: true
    },
    group: {
        type: String
    },
    org_id: {
        type: String,
        required: true
    },
    emp_id: {
        type: String,
        required: true
    }
})

export default mongoose.model<IWarehouse>("Warehouse", warehouseSchema)
