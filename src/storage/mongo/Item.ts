import { ItemRepo, IItemAllResponse } from "../repo/Item"
import Item, { IItem } from "../../models/Item"
import { logger } from "../../config/logger"
import AppError from "../../utils/appError"

export class ItemStorage implements ItemRepo {
    private scope = "storage.item"

    async find(query: Object): Promise<IItem[]> {
        try {
            let dbObj = await Item.find({ ...query })

            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.find: finished with error: ${error}`)
            throw error
        }
    }

    async findOne(query: Object): Promise<IItem> {
        try {
            let dbObj = await Item.findOne({ ...query })

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

    async findById(id: string): Promise<IItem> {
        try {
            let dbObj = await Item.findById(id)

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

    async create(payload: IItem): Promise<IItem> {
        try {
            let dbObj = await Item.create(payload)

            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.create: finished with error: ${error}`)
            throw error
        }
    }

    async update(query: Object, payload: IItem): Promise<IItem> {
        try {
            let dbObj = await Item.findByIdAndUpdate(query, payload, {
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
            let dbObj = await Item.findOneAndDelete(query)

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
