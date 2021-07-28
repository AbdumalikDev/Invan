import mongoose, { Schema, Document } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

export interface IGroupWarehouse extends Document {
    _id: string
    org_id: string
    name: string
    sub_groups: string[]
}

const GroupSchema: Schema<IGroupWarehouse> = new Schema(
    {
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
        sub_groups: [
            {
                type: String,
                ref: 'Group'
            }
        ]
    },
    {
        timestamps: true
    }
)

export default mongoose.model<IGroupWarehouse>('GroupWarehouse', GroupSchema)
