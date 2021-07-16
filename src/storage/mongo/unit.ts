import { UnitRepo } from '../repo/unit'
import Unit, { IUnit } from '../../models/Unit'
import { logger } from '../../config/logger'
import AppError from '../../utils/appError'

export class UnitStorage implements UnitRepo {
    private scope = 'storage.unit'

    async create(payload: IUnit): Promise<IUnit> {
        try {
            const unit = await Unit.create(payload)

            return unit
        } catch (error) {
            logger.error(`${this.scope}.create: finished with error: ${error}`)
            throw error
        }
    }

    async update(query: Object, payload: IUnit): Promise<IUnit> {
        try {
            const unit = await Unit.findOneAndUpdate(query, payload, { new: true }).select(
                '_id name full_name'
            )

            if (!unit) {
                logger.warn(`${this.scope}.update failed to findOneAndUpdate`)
                throw new AppError(404, 'Unit not found', 'unit')
            }

            return unit
        } catch (error) {
            logger.error(`${this.scope}.update: finished with error: ${error}`)
            throw error
        }
    }

    async delete(query: Object): Promise<string> {
        try {
            const unit = await Unit.findOneAndDelete(query)

            if (!unit) {
                logger.warn(`${this.scope}.delete failed to findOneAndDelete`)
                throw new AppError(404, 'Unit not found', 'unit')
            }

            return 'Unit has been deleted'
        } catch (error) {
            logger.error(`${this.scope}.delete: finished with error: ${error}`)
            throw error
        }
    }

    async find(query: Object): Promise<IUnit[]> {
        try {
            const units = await Unit.find(query).select('_id name full_name developer')

            return units
        } catch (error) {
            logger.error(`${this.scope}.find: finished with error: ${error}`)
            throw error
        }
    }

    async findOne(query: Object): Promise<IUnit> {
        try {
            const unit = await Unit.findOne(query).select('_id name full_name')

            if (!unit) {
                logger.warn(`${this.scope}.findOne failed to findOne`)
                throw new AppError(404, 'Unit not found', 'unit')
            }

            return unit
        } catch (error) {
            logger.error(`${this.scope}.findById: finished with error: ${error}`)
            throw error
        }
    }
}
