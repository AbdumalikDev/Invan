import mongoose, { Schema, Document } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

export interface IUser extends Document {
    _id: string
    name: {
        firstName: string
        lastName: string
    }
    age: number
    gender: string
    phone_number: number
    organizations: {
        _id: string
        name: string
    }[]
    billings: string[]
    current_tariff: string
    avatar: string
    email: string
    email_subs: string[]
    employees: {
        _id: string
        name: string
    }[]
    sessions: {
        _id: string
        user_agent: string
        ip_address: string
        created_at: Date
    }[]
    audit: string[]
}

const UserSchema: Schema<IUser> = new Schema(
    {
        _id: {
            type: String,
            default: uuidv4
        },
        name: {
            firstName: {
                type: String,
                required: true
            },
            lastName: {
                type: String
            }
        },
        age: {
            type: Number
        },
        gender: {
            type: String
        },
        phone_number: {
            type: String,
            required: true,
            unique: true
        },
        organizations: [
            {
                _id: {
                    type: String,
                    default: uuidv4
                },
                name: {
                    type: String,
                    required: true
                }
            }
        ],
        billings: [
            {
                type: String
            }
        ],
        current_tariff: {
            type: String,
            default: 'free'
        },
        avatar: {
            type: String
        },
        email: {
            type: String
        },
        email_subs: [
            {
                type: String
            }
        ],
        employees: [
            {
                _id: {
                    type: String,
                    default: uuidv4
                },
                name: {
                    type: String
                }
            }
        ],
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
        audit: [
            {
                type: String
            }
        ]
    },
    {
        timestamps: true
    }
)

export default mongoose.model<IUser>('users', UserSchema)
