import mongoose, { Schema, Document } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

export interface IAudit extends Document {
    _id: string
    org_id: string
    action: string
    events: string
}

const AuditSchema: Schema<IAudit> = new Schema(
    {
        _id: {
            type: String,
            default: uuidv4
        },
        org_id: {
            type: String,
            required: true
        },
        action: {
            type: String,
            required: true,
            enum: ['create', 'update', 'delete', 'all']
        },
        events: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model<IAudit>('audits', AuditSchema)
