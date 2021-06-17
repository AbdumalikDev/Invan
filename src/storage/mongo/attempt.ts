import { AttemptRepo, IAttemptAllResponse } from '../repo/attempt'
import Attempt, { IAttempt } from '../../models/Attempt'
import { logger } from '../../config/logger'
import AppError from '../../utils/appError'

export class AttemptStorage implements AttemptRepo {
    private scope = 'storage.attempt'

    async findOne(query: Object): Promise<IAttempt | null> {
        try {
            let attempt = await Attempt.findOne({ ...query })

            return attempt
        } catch (error) {
            logger.error(`${this.scope}.findOne: finished with error: ${error}`)
            throw error
        }
    }

    async create(payload: IAttempt): Promise<IAttempt> {
        try {
            const newAttempt = await Attempt.create(payload)

            return newAttempt
        } catch (error) {
            logger.error(`${this.scope}.create: finished with error: ${error}`)
            throw error
        }
    }

    async update(query: Object, payload: IAttempt): Promise<IAttempt> {
        try {
            const attempt = await Attempt.findOneAndUpdate({ ...query }, payload, {
                new: true
            })

            if (!attempt) {
                logger.warn(`${this.scope}.update failed to findByIdAndUpdate`)
                throw new AppError(404, 'Db object is not found', 'obj')
            }

            return attempt
        } catch (error) {
            logger.error(`${this.scope}.update: finished with error: ${error}`)
            throw error
        }
    }

    async delete(query: Object): Promise<string> {
        try {
            await Attempt.findOneAndDelete({ ...query })

            return 'Successfully deleted'
        } catch (error) {
            logger.error(`${this.scope}.delete: finished with error: ${error}`)
            throw error
        }
    }
}
