import { BanRepo, IBanAllResponse } from '../repo/ban'
import Ban, { IBan } from '../../models/Ban'
import { logger } from '../../config/logger'

export class BanStorage implements BanRepo {
    private scope = 'storage.ban'

    async findOne(query: Object): Promise<IBan | null> {
        try {
            const ban = await Ban.findOne({ ...query })

            return ban
        } catch (error) {
            logger.error(`${this.scope}.findOne: finished with error: ${error}`)
            throw error
        }
    }

    async create(payload: IBan): Promise<IBan> {
        try {
            const newBan = await Ban.create(payload)

            return newBan
        } catch (error) {
            logger.error(`${this.scope}.create: finished with error: ${error}`)
            throw error
        }
    }
}
