import mongoose, { Schema, Document } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

export interface IUnit extends Document {
    _id: string
    org_id: string
    name: string
    full_name: string
}

const UnitSchema: Schema<IUnit> = new Schema({
    _id: {
        type: String,
        default: uuidv4
    },
    org_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    full_name: {
        type: String,
        required: true
    }
})

export default mongoose.model<IUnit>('units', UnitSchema)
