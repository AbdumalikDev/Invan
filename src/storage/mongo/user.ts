import { UserRepo, IUserAllResponse } from '../repo/user'
import User, { IUser } from '../../models/User'
import { logger } from '../../config/logger'
import AppError from '../../utils/appError'

export class UserStorage implements UserRepo {
    private scope = 'storage.user'

    async findOne(query: Object): Promise<IUser> {
        try {
            let user = await User.findOne({ ...query })

            if (!user) {
                logger.warn(`${this.scope}.get failed to findOne`)
                throw new AppError(404, 'Db object is not found', 'obj')
            }

            return user
        } catch (error) {
            logger.error(`${this.scope}.findOne: finished with error: ${error}`)
            throw error
        }
    }

    async create(payload: IUser): Promise<IUser> {
        try {
            let newUser = await User.create(payload)

            return newUser
        } catch (error) {
            logger.error(`${this.scope}.create: finished with error: ${error}`)
            throw error
        }
    }

    async userExist(query: Object): Promise<boolean> {
        try {
            const user = await User.findOne({ ...query })

            if (!user) {
                return false
            }

            return true
        } catch (error) {
            logger.error(`${this.scope}.userExist: finished with error: ${error}`)
            throw error
        }
    }

    async update(query: Object, payload: Object): Promise<IUser | null> {
        try {
            let newUser = await User.findOneAndUpdate({ ...query }, payload, { new: true })

            return newUser
        } catch (error) {
            logger.error(`${this.scope}.create: finished with error: ${error}`)
            throw error
        }
    }
}
