import { OutcomeRepo } from '../repo/outcome'
import Outcome, { IOutcome } from '../../models/Outcome'
import { logger } from '../../config/logger'
import AppError from '../../utils/appError'

export class OutcomeStorage implements OutcomeRepo {
    private scope = 'storage.outcome'

    async create(payload: IOutcome): Promise<IOutcome> {
        try {
            const outcome = await Outcome.create(payload)

            return outcome
        } catch (error) {
            logger.error(`${this.scope}.create: finished with error: ${error}`)
            throw error
        }
    }

    async update(query: Object, payload: IOutcome): Promise<IOutcome> {
        try {
            const outcome = await Outcome.findOneAndUpdate(query, payload, { new: true })

            if (!outcome) {
                logger.warn(`${this.scope}.update failed to findOneAndUpdate`)
                throw new AppError(404, 'Outcome not found', 'outcome')
            }

            return outcome
        } catch (error) {
            logger.error(`${this.scope}.update: finished with error: ${error}`)
            throw error
        }
    }

    async delete(query: Object): Promise<string> {
        try {
            const outcome = await Outcome.findOneAndDelete(query)

            if (!outcome) {
                logger.warn(`${this.scope}.delete failed to findOneAndDelete`)
                throw new AppError(404, 'Outcome not found', 'outcome')
            }

            return 'Outcome successfully deleted'
        } catch (error) {
            logger.error(`${this.scope}.delete: finished with error: ${error}`)
            throw error
        }
    }

    async find(query: Object): Promise<IOutcome[]> {
        try {
            const outcomes = await Outcome.find(query)

            return outcomes
        } catch (error) {
            logger.error(`${this.scope}.find: finished with error: ${error}`)
            throw error
        }
    }

    async findOne(query: Object): Promise<IOutcome> {
        try {
            const outcome = await Outcome.findOne(query)

            if (!outcome) {
                logger.warn(`${this.scope}.findOne failed to finOne`)
                throw new AppError(404, 'Outcome not found', 'outcome')
            }

            return outcome
        } catch (error) {
            logger.error(`${this.scope}.findOne: finished with error: ${error}`)
            throw error
        }
    }
}
