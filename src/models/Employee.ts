import mongoose, { Schema, Document } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
import { IOrganization } from './Organization'
export interface IEmployee extends Document {
    _id: string
    org_id: string | IOrganization
    owner_id: string
    name: {
        first_name: string
        last_name: string
    }
    age: number
    gender: string
    phone_number: number
    status: string
    is_shared: boolean
    access_level: string
    avatar: string
    email: string
    state: string
    sessions: {
        _id: string
        user_agent: string
        ip_address: string
        created_at: Date
    }[]
    allow_sessions: number
}

const EmployeeSchema: Schema<IEmployee> = new Schema(
    {
        _id: {
            type: String,
            default: uuidv4
        },
        org_id: {
            type: String,
            required: true,
            ref: 'organization'
        },
        owner_id: {
            type: String
        },
        name: {
            first_name: {
                type: String,
                required: true
            },
            last_name: {
                type: String,
                default: null
            }
        },
        age: {
            type: Number,
            default: null
        },
        gender: {
            type: String,
            default: null
        },
        phone_number: {
            type: Number,
            required: true,
            unique: true
        },
        status: {
            type: String,
            required: true,
            default: 'admin'
        },
        is_shared: {
            type: Boolean,
            default: true
        },
        access_level: {
            type: String
        },
        avatar: {
            type: String,
            default: null
        },
        email: {
            type: String,
            default: null
        },
        state: {
            type: String,
            required: true,
            default: 'pending'
        },
        sessions: [
            {
                _id: {
                    type: String,
                    default: uuidv4
                },
                user_agent: {
                    type: String,
                    required: true
                },
                ip_address: {
                    type: String,
                    required: true
                },
                created_at: {
                    type: Date,
                    default: Date.now
                }
            }
        ],
        allow_sessions: {
            type: Number,
            default: 2
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model<IEmployee>('employee', EmployeeSchema)
