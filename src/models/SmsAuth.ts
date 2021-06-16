import mongoose, { Schema, Document } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

export interface ISmsAuth extends Document {
    _id: string
    phone_number: number
    code: number
    createdAt: Date
}

const SmsAuthSchema = new Schema({
    _id: {
        type: String,
        default: uuidv4
    },
    phone_number: {
        type: Number,
        required: true,
        unique: true
    },
    code: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '3m'
    }
})

export default mongoose.model<ISmsAuth>('smsAuth', SmsAuthSchema)
