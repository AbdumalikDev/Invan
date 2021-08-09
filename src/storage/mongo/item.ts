import { ItemRepo, IItemAllResponse } from '../repo/item'
import Item, { IItem } from '../../models/Item'
import { logger } from '../../config/logger'
import AppError from '../../utils/appError'

export class ItemStorage implements ItemRepo {
    private scope = 'storage.item'

    async find(query: Object): Promise<IItem[]> {
        try {
            let items = await Item.find(query).populate('product_id')

            return items
        } catch (error) {
            logger.error(`${this.scope}.find: finished with error: ${error}`)
            throw error
        }
    }

    async findOne(query: Object): Promise<IItem> {
        try {
            let item = await Item.findOne(query).populate('product_id')

            if (!item) {
                logger.warn(`${this.scope}.get failed to findOne`)
                throw new AppError(404, 'Item not found', 'item')
            }

            return item
        } catch (error) {
            logger.error(`${this.scope}.findOne: finished with error: ${error}`)
            throw error
        }
    }

    async create(payload: IItem): Promise<IItem> {
        try {
            let item = await Item.create(payload)

            return item
        } catch (error) {
            logger.error(`${this.scope}.create: finished with error: ${error}`)
            throw error
        }
    }

    async update(query: Object, payload: IItem): Promise<IItem> {
        try {
            let item = await Item.findOneAndUpdate(query, payload, {
                new: true
            })

            if (!item) {
                logger.warn(`${this.scope}.update failed to findByIdAndUpdate`)
                throw new AppError(404, 'Item not found', 'item')
            }

            return item
        } catch (error) {
            logger.error(`${this.scope}.update: finished with error: ${error}`)
            throw error
        }
    }

    async deleteMany(query: Object): Promise<string> {
        try {
            let items = await Item.deleteMany(query)

            if (!items) {
                logger.warn(`${this.scope}.delete failed to deleteMany`)
                throw new AppError(404, 'Items not found', 'item')
            }

            return 'Items have been successfully deleted'
        } catch (error) {
            logger.error(`${this.scope}.delete: finished with error: ${error}`)
            throw error
        }
    }
}
