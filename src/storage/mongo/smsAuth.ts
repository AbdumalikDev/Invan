import { SmsAuthRepo, ISmsAuthAllResponse } from '../repo/smsAuth'
import SmsAuth, { ISmsAuth } from '../../models/SmsAuth'
import { logger } from '../../config/logger'
import AppError from '../../utils/appError'

export class SmsAuthStorage implements SmsAuthRepo {
    private scope = 'storage.sample'

    async findOne(query: Object): Promise<ISmsAuth | null> {
        try {
            let smsAuth = await SmsAuth.findOne({ ...query })

            return smsAuth
        } catch (error) {
            logger.error(`${this.scope}.findOne: finished with error: ${error}`)
            throw error
        }
    }

    async create(payload: ISmsAuth): Promise<ISmsAuth> {
        try {
            let newSmsAuth = await SmsAuth.create(payload)

            return newSmsAuth
        } catch (error) {
            logger.error(`${this.scope}.create: finished with error: ${error}`)
            throw error
        }
    }
}
