import { OrganizationRepo } from '../repo/organization'
import Organization, { IOrganization } from '../../models/Organization'
import { logger } from '../../config/logger'
import AppError from '../../utils/appError'

export class OrganizationStorage implements OrganizationRepo {
    private scope = 'storage.organization'

    async create(payload: IOrganization): Promise<IOrganization> {
        try {
            const newOrg = await Organization.create(payload)

            return newOrg
        } catch (error) {
            logger.error(`${this.scope}.create: finished with error: ${error}`)
            throw error
        }
    }

    async findOne(query: Object): Promise<IOrganization> {
        try {
            const org = await Organization.findOne({ ...query })

            if (!org) {
                logger.warn(`${this.scope}.get failed to findOne`)
                throw new AppError(404, 'Organization not found', 'org')
            }

            return org
        } catch (error) {
            logger.error(`${this.scope}.findOne: finished with error: ${error}`)
            throw error
        }
    }

    async orgExist(query: Object): Promise<boolean> {
        try {
            const org = await Organization.findOne({ ...query })

            if (!org) {
                return false
            }

            return true
        } catch (error) {
            logger.error(`${this.scope}.orgExist: finished with error: ${error}`)
            throw error
        }
    }
}
