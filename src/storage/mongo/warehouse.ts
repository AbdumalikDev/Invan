import { WarehouseRepo, IWarehouseAllResponse } from "../repo/warehouse"
import Warehouse, { IWarehouse } from "../../models/Warehouse"
import { logger } from "../../config/logger"
import AppError from "../../utils/appError"

export class WarehouseStorage implements WarehouseRepo {
    private scope = "storage.warehouse"

    async find(query: Object): Promise<IWarehouse[]> {
        try {
            let dbObj = await Warehouse.find({ ...query })

            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.find: finished with error: ${error}`)
            throw error
        }
    }

    async findOne(query: Object): Promise<IWarehouse> {
        try {
            let dbObj = await Warehouse.findOne({ ...query })

            if (!dbObj) {
                logger.warn(`${this.scope}.get failed to findOne`)
                throw new AppError(404, "Db object is not found", "warehouse")
            }

            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.findOne: finished with error: ${error}`)
            throw error
        }
    }

    async findById(id: string): Promise<IWarehouse> {
        try {
            let dbObj = await Warehouse.findById(id)

            if (!dbObj) {
                logger.warn(`${this.scope}.get failed to findOne`)
                throw new AppError(404, "Db object is not found", "warehouse")
            }

            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.findOne: finished with error: ${error}`)
            throw error
        }
    }

    async create(payload: IWarehouse): Promise<IWarehouse> {
        try {
            let dbObj = await Warehouse.create(payload)

            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.create: finished with error: ${error}`)
            throw error
        }
    }

    async update(query: Object, payload: IWarehouse): Promise<IWarehouse> {
        try {
            let dbObj = await Warehouse.findByIdAndUpdate(query, payload, {
                new: true
            })

            if (!dbObj) {
                logger.warn(`${this.scope}.update failed to findByIdAndUpdate`)
                throw new AppError(404, "Db object is not found", "warehouse")
            }

            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.update: finished with error: ${error}`)
            throw error
        }
    }

    async delete(query: Object): Promise<any> {
        try {
            let dbObj = await Warehouse.findOneAndDelete(query)

            if (!dbObj) {
                logger.warn(`${this.scope}.delete failed to findByIdAndDelete`)
                throw new AppError(404, "Db object is not found", "warehouse")
            }

            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.delete: finished with error: ${error}`)
            throw error
        }
    }
}
