import mongoose, { Schema, Document } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

export interface IOrganization extends Document {
    _id: string
    org_name: string
    address: string
    current_tarif: string
    phone_number: number
}

const OrganizationSchema: Schema<IOrganization> = new Schema(
    {
        _id: {
            type: String,
            default: uuidv4
        },
        org_name: {
            type: String,
            required: true,
            unique: true
        },
        address: {
            type: String
        },
        current_tarif: {
            type: String,
            required: true,
            default: 'free'
        },
        phone_number: {
            type: Number,
<<<<<<< HEAD
            required: true,
            unique: true
        }
=======
            required: true
        },
>>>>>>> mainsam
    },
    {
        timestamps: true
    }
)

export default mongoose.model<IOrganization>('organization', OrganizationSchema)
