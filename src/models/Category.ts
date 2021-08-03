import mongoose, { Schema, Document } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
import MongooseDeepPopulate from 'mongoose-deep-populate'

export interface ICategory extends Document {
    _id: string
    org_id: string
    name: string
    sub_categories: string[]
    parent_category: string
}

const CategorySchema: Schema<ICategory> = new Schema(
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
                ref: 'categories'
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

export default mongoose.model<ICategory>('categories', CategorySchema)
