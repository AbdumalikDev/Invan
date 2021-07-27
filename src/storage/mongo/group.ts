import { GroupRepo } from '../../storage/repo/group'
import Group, { IGroup } from '../../models/Group'
import contractor, { IContractor } from '../../models/Contractor'
import { logger } from '../../config/logger'
import AppError from '../../utils/appError'

export class GroupStorage implements GroupRepo {
    private scope = 'storage.group'

    async create(payload: IGroup): Promise<IGroup> {
        try {
            const group = await Group.create(payload)

            return group
        } catch (error) {
            logger.error(`${this.scope}.create: finished with error: ${error}`)
            throw error
        }
    }

    async update(query: Object, payload: IGroup): Promise<IGroup> {
        try {
            const group = await Group.findOneAndUpdate(query, payload, { new: true }).select(
                '_id name full_name contractor'
            )

            if (!group) {
                logger.warn(`${this.scope}.update failed to findOneAndUpdate`)
                throw new AppError(404, 'Group not found', 'group')
            }

            return group
        } catch (error) {
            logger.error(`${this.scope}.update: finished with error: ${error}`)
            throw error
        }
    }

    async findOne(query: Object): Promise<IGroup> {
        try {
            const group = await Group.findOne(query)
                .populate('contractor')
                .select('_id name contractor')

            if (!group) {
                logger.warn(`${this.scope}.findOne failed to findOne`)
                throw new AppError(404, 'Group not found', 'group')
            }

            return group
        } catch (error) {
            logger.error(`${this.scope}.findOne: finished with error: ${error}`)
            throw error
        }
    }

    async delete(query: Object): Promise<IGroup> {
        try {
            const group = await Group.findOneAndDelete(query)

            if (!group) {
                logger.warn(`${this.scope}.delete failed to findOneAndDelete`)
                throw new AppError(404, 'Group not found', 'group')
            }

            return group
        } catch (error) {
            logger.error(`${this.scope}.delete: finished with error: ${error}`)
            throw error
        }
    }

    async findAndPopulate(query: Object): Promise<IGroup> {
        try {
            let group = await Group.findOne({ ...query }).populate('contractor')
            if (!group) {
                logger.warn(`${this.scope}.get failed to findOne`)
                throw new AppError(404, 'Group not found', 'emp')
            }

            return group
        } catch (error) {
            logger.error(`${this.scope}.findOne: finished with error: ${error}`)
            throw error
        }
    }
}
