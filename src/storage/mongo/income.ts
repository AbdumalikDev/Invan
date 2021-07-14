import { IncomeRepo, IIncomeAllResponse } from "../repo/income"
import Income, { IIncome } from "../../models/Income"
import { logger } from "../../config/logger"
import AppError from "../../utils/appError"

export class IncomeStorage implements IncomeRepo {
    private scope = "storage.income"

    async find(query: Object): Promise<IIncome[]> {
        try {
            let dbObj = await Income.find({ ...query })

            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.find: finished with error: ${error}`)
            throw error
        }
    }

    async findById(id: string): Promise<IIncome> {
        try {
            let dbObj = await Income.findById(id)

            if (!dbObj) {
                logger.warn(`${this.scope}.get failed to findOne`)
                throw new AppError(404, "Db object is not found", "income")
            }

            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.findOne: finished with error: ${error}`)
            throw error
        }
    }

    async findOne(query: Object): Promise<IIncome> {
        try {
            let dbObj = await Income.findOne({ ...query })

            if (!dbObj) {
                logger.warn(`${this.scope}.get failed to findOne`)
                throw new AppError(404, "Db object is not found", "income")
            }

            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.findOne: finished with error: ${error}`)
            throw error
        }
    }

    async create(payload: IIncome): Promise<IIncome> {
        try {
            let dbObj = await Income.create(payload)

            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.create: finished with error: ${error}`)
            throw error
        }
    }

    async update(query: Object, payload: IIncome): Promise<IIncome> {
        try {
            let dbObj = await Income.findByIdAndUpdate(query, payload, {
                new: true
            })

            if (!dbObj) {
                logger.warn(`${this.scope}.update failed to findByIdAndUpdate`)
                throw new AppError(404, "Db object is not found", "income")
            }

            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.update: finished with error: ${error}`)
            throw error
        }
    }

    async delete(query: Object): Promise<any> {
        try {
            let dbObj = await Income.findOneAndDelete(query)

            if (!dbObj) {
                logger.warn(`${this.scope}.delete failed to findByIdAndDelete`)
                throw new AppError(404, "Db object is not found", "income")
            }

            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.delete: finished with error: ${error}`)
            throw error
        }
    }
}
