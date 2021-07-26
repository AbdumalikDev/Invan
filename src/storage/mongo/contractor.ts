import { ContractorRepo, IContractorAllResponse } from '../repo/contractor'
import Contractor, { IContractor } from '../../models/Contractor'
import { logger } from '../../config/logger'
import AppError from '../../utils/appError'

export class ContractorStorage implements ContractorRepo {
    private scope = 'storage.contractor'

    async create(payload: IContractor): Promise<IContractor> {
        try {
            const contractor = await Contractor.create(payload)

            return contractor
        } catch (error) {
            logger.error(`${this.scope}.create: finished with error: ${error}`)
            throw error
        }
    }

    async update(query: Object, payload: IContractor): Promise<IContractor> {
        try {
            const contractor = await Contractor.findOneAndUpdate(query, payload, {
                new: true
            })

            if (!contractor) {
                logger.warn(`${this.scope}.update failed to findByIdAndUpdate`)
                throw new AppError(404, 'Db object is not found', 'contractor')
            }

            return contractor
        } catch (error) {
            logger.error(`${this.scope}.update: finished with error: ${error}`)
            throw error
        }
    }

    async deleteMany(query: Object): Promise<string> {
        try {
            const contractor = await Contractor.deleteMany(query)

            if (!contractor) {
                logger.warn(`${this.scope}.delete failed to deleteMany`)
                throw new AppError(404, 'Db object is not found', 'contractor')
            }

            return 'Contractors have been successfully deleted'
        } catch (error) {
            logger.error(`${this.scope}.delete: finished with error: ${error}`)
            throw error
        }
    }

    async find(query: Object): Promise<IContractor[]> {
        try {
            const contractors = await Contractor.find(query)

            return contractors
        } catch (error) {
            logger.error(`${this.scope}.find: finished with error: ${error}`)
            throw error
        }
    }

    async findOne(query: Object): Promise<IContractor> {
        try {
            const contractor = await Contractor.findOne(query)

            if (!contractor) {
                logger.warn(`${this.scope}.get failed to findOne`)
                throw new AppError(404, 'Contractor is not found', 'contractor')
            }

            return contractor
        } catch (error) {
            logger.error(`${this.scope}.findOne: finished with error: ${error}`)
            throw error
        }
    }
}
