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

    async find(query: Object): Promise<IUnit[]> {
        try {
            const units = await Unit.find(query)

            return units
        } catch (error) {
            logger.error(`${this.scope}.find: finished with error: ${error}`)
            throw error
        }
    }
}
