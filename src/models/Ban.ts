import mongoose, { Schema, Document } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

export interface IBan extends Document {
    _id: string
    phone_number: number
    ban: boolean
    createdAt: Date
}

const BanSchema: Schema<IBan> = new Schema({
    _id: {
        type: String,
        default: uuidv4
    },
    phone_number: {
        type: Number,
        required: true,
        unique: true
    },
    ban: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '3m'
    }
})

export default mongoose.model<IBan>('bans', BanSchema)
