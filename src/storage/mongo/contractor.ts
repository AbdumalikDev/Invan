import { ContractorRepo, IContractorAllResponse } from "../repo/contractor"
import Contractor, { IContractor } from "../../models/Contractor"
import { logger } from "../../config/logger"
import AppError from "../../utils/appError"

export class ContractorStorage implements ContractorRepo {
    private scope = "storage.contractor"

    async find(query: Object): Promise<IContractor[]> {
        try {
            let dbObj = await Contractor.find({ ...query })

            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.find: finished with error: ${error}`)
            throw error
        }
    }

    async findOne(query: Object): Promise<IContractor> {
        try {
            let dbObj = await Contractor.findOne({ ...query })

            if (!dbObj) {
                logger.warn(`${this.scope}.get failed to findOne`)
                throw new AppError(404, "Db object is not found", "item")
            }

            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.findOne: finished with error: ${error}`)
            throw error
        }
    }

    async findById(id: string): Promise<IContractor> {
        try {
            let dbObj = await Contractor.findById(id)

            if (!dbObj) {
                logger.warn(`${this.scope}.get failed to findOne`)
                throw new AppError(404, "Db object is not found", "item")
            }

            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.findOne: finished with error: ${error}`)
            throw error
        }
    }

    async create(payload: IContractor): Promise<IContractor> {
        try {
            let dbObj = await Contractor.create(payload)

            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.create: finished with error: ${error}`)
            throw error
        }
    }

    async update(query: Object, payload: IContractor): Promise<IContractor> {
        try {
            let dbObj = await Contractor.findByIdAndUpdate(query, payload, {
                new: true
            })

            if (!dbObj) {
                logger.warn(`${this.scope}.update failed to findByIdAndUpdate`)
                throw new AppError(404, "Db object is not found", "item")
            }

            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.update: finished with error: ${error}`)
            throw error
        }
    }

    async delete(query: Object): Promise<any> {
        try {
            let dbObj = await Contractor.findOneAndDelete(query)
            if (!dbObj) {
                throw new Error("there is no Contractor")
            }
            if (!dbObj) {
                logger.warn(`${this.scope}.delete failed to findByIdAndDelete`)
                throw new AppError(404, "Db object is not found", "item")
            }

            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.delete: finished with error: ${error}`)
            throw error
        }
    }
}
