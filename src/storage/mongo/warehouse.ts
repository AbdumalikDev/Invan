import { WarehouseRepo, IWarehouseAllResponse } from '../repo/warehouse'
import Warehouse, { IWarehouse } from '../../models/Warehouse'
import { logger } from '../../config/logger'
import AppError from '../../utils/appError'

export class WarehouseStorage implements WarehouseRepo {
    private scope = 'storage.warehouse'

    async create(payload: IWarehouse): Promise<IWarehouse> {
        try {
            const warehouse = await Warehouse.create(payload)

            return warehouse
        } catch (error) {
            logger.error(`${this.scope}.create: finished with error: ${error}`)
            throw error
        }
    }

    async update(query: Object, payload: IWarehouse | Object): Promise<IWarehouse> {
        try {
            const warehouse = await Warehouse.findOneAndUpdate(query, payload, {
                new: true
            })

            if (!warehouse) {
                logger.warn(`${this.scope}.update failed to findOneAndUpdate`)
                throw new AppError(404, 'Warehouse is not found', 'warehouse')
            }

            return warehouse
        } catch (error) {
            logger.error(`${this.scope}.update: finished with error: ${error}`)
            throw error
        }
    }

    async deleteMany(query: Object): Promise<string> {
        try {
            const warehouses = await Warehouse.deleteMany(query)

            if (!warehouses) {
                logger.warn(`${this.scope}.delete failed to deleteMany`)
                throw new AppError(404, 'Warehouses not found', 'warehouse')
            }

            return 'Warehouses have been deleted successfully'
        } catch (error) {
            logger.error(`${this.scope}.delete: finished with error: ${error}`)
            throw error
        }
    }

    async find(query: Object): Promise<IWarehouse[]> {
        try {
            const warehouses = await Warehouse.find(query).populate('sub_warehouses')

            return warehouses
        } catch (error) {
            logger.error(`${this.scope}.find: finished with error: ${error}`)
            throw error
        }
    }

    async findOne(query: Object): Promise<IWarehouse> {
        try {
            const warehouse = await Warehouse.findOne(query).populate('sub_warehouses')

            if (!warehouse) {
                logger.warn(`${this.scope}.get failed to findOne`)
                throw new AppError(404, 'Db object is not found', 'warehouse')
            }

            return warehouse
        } catch (error) {
            logger.error(`${this.scope}.findOne: finished with error: ${error}`)
            throw error
        }
    }
}
