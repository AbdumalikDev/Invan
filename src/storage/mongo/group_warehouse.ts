import { GroupWarehouseRepo } from '../../storage/repo/group_warehouse'
import GroupWarehouse, { IGroupWarehouse } from '../../models/Group_wearhouse'
import { logger } from '../../config/logger'
import AppError from '../../utils/appError'

export class GroupWarehouseStorage implements GroupWarehouseRepo {
    private scope = 'storage.group_warehouse'

    async create(payload: IGroupWarehouse): Promise<IGroupWarehouse> {
        try {
            const group_warehouse = await GroupWarehouse.create(payload)

            return group_warehouse
        } catch (error) {
            logger.error(`${this.scope}.create: finished with error: ${error}`)
            throw error
        }
    }

    async update(query: Object, payload: IGroupWarehouse): Promise<IGroupWarehouse> {
        try {
            const group_warehouse = await GroupWarehouse.findOneAndUpdate(query, payload, { new: true }).select(
                '_id name full_name sub_groups'
            )

            if (!group_warehouse) {
                logger.warn(`${this.scope}.update failed to findOneAndUpdate`)
                throw new AppError(404, 'GroupWarehouse not found', 'group_warehouse')
            }

            return group_warehouse
        } catch (error) {
            logger.error(`${this.scope}.update: finished with error: ${error}`)
            throw error
        }
    }

    async findOne(query: Object): Promise<IGroupWarehouse> {
        try {
            const group_warehouse = await GroupWarehouse.findOne(query)
                .populate('sub_groups')
                .select('_id name sub_groups')

            if (!group_warehouse) {
                logger.warn(`${this.scope}.findOne failed to findOne`)
                throw new AppError(404, 'GroupWarehouse not found', 'group_warehouse')
            }

            return group_warehouse
        } catch (error) {
            logger.error(`${this.scope}.findOne: finished with error: ${error}`)
            throw error
        }
    }

    async delete(query: Object): Promise<IGroupWarehouse> {
        try {
            const group_warehouse = await GroupWarehouse.findOneAndDelete(query)

            if (!group_warehouse) {
                logger.warn(`${this.scope}.delete failed to findOneAndDelete`)
                throw new AppError(404, 'GroupWarehouse not found', 'group_warehouse')
            }

            return group_warehouse
        } catch (error) {
            logger.error(`${this.scope}.delete: finished with error: ${error}`)
            throw error
        }
    }

    async findAndPopulate(query: Object): Promise<IGroupWarehouse> {
        try {
            let group_warehouse = await GroupWarehouse.findOne({ ...query }).populate('sub_groups')
            if (!group_warehouse) {
                logger.warn(`${this.scope}.get failed to findOne`)
                throw new AppError(404, 'GroupWarehouse not found', 'emp')
            }

            return group_warehouse
        } catch (error) {
            logger.error(`${this.scope}.findOne: finished with error: ${error}`)
            throw error
        }
    }
}
