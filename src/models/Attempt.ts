import mongoose, { Schema, Document } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

export interface IAttempt extends Document {
    _id: string
    phone_number: number
    attempts: number
}

const AttemptSchema: Schema<IAttempt> = new Schema({
    _id: {
        type: String,
        default: uuidv4
    },
    phone_number: {
        type: Number,
        required: true,
        unique: true
    },
    attempts: {
        type: Number,
        default: 0
    }
})

export default mongoose.model<IAttempt>('attempts', AttemptSchema)
