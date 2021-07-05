import { AuditRepo } from '../repo/audit'
import Audit, { IAudit } from '../../models/Audit'
import { logger } from '../../config/logger'

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
            const audits = await Audit.find(query).select('action events createdAt')

            return audits
        } catch (error) {
            logger.error(`${this.scope}.find: finished with error: ${error}`)
            throw error
        }
    }
}
