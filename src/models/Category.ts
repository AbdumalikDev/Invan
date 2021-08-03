import mongoose, { Schema, Document } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
import autopopulate from 'mongoose-autopopulate'

export interface ICategory extends Document {
    _id: string
    org_id: string
    name: string
    sub_categories: string[]
    parent_category: string
}

const CategorySchema = new Schema(
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
        sub_categories: [
            {
                type: String,
                ref: 'categories',
                autopopulate: true
            }
        ],
        parent_category: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

CategorySchema.plugin(autopopulate)

export default mongoose.model<ICategory>('categories', CategorySchema)
