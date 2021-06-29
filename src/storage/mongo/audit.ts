import { AuditRepo } from '../repo/audit'
import Audit, { IAudit } from '../../models/Audit'
import { logger } from '../../config/logger'
import AppError from '../../utils/appError'

export class AuditStorage implements AuditRepo {
    private scope = 'storage.audit'

    async create(payload: IAudit): Promise<IAudit> {
        try {
            const newAudit = await Audit.create(payload)

            return newAudit
        } catch (error) {
            logger.error(`${this.scope}.create: finished with error: ${error}`)
            throw error
        }
    }

    async find(query: Object): Promise<IAudit[]> {
        try {
            const audits = await Audit.find(query)

            if (!audits) {
                logger.warn(`${this.scope}.get failed to find`)
                throw new AppError(404, 'Audits not found', 'audit')
            }

            return audits
        } catch (error) {
            logger.error(`${this.scope}.find: finished with error: ${error}`)
            throw error
        }
    }
}
