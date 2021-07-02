import mongoose, { Schema, Document } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

export interface ICategory extends Document {
    _id: string
    name: string
    sub_categories: string[]
}

const CategorySchema: Schema<ICategory> = new Schema({
    _id: {
        type: String,
        default: uuidv4
    },
    name: {
        type: String,
        required: true
    },
    sub_categories: [
        {
            type: String,
            ref: 'categories'
        }
    ]
})

export default mongoose.model<ICategory>('categories', CategorySchema)