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
            const group = await Group.findOneAndUpdate(query, payload, { new: true })

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

    async deleteMany(query: Object): Promise<string> {
        try {
            const groups = await Group.deleteMany(query)

            if (!groups) {
                logger.warn(`${this.scope}.delete failed to findOneAndDelete`)
                throw new AppError(404, 'Group not found', 'group')
            }

            return 'Groups have been successfully deleted'
        } catch (error) {
            logger.error(`${this.scope}.delete: finished with error: ${error}`)
            throw error
        }
    }

    async find(query: Object): Promise<IGroup[]> {
        try {
            const groups = await Group.find(query).populate('contractors')

            return groups
        } catch (error) {
            logger.error(`${this.scope}.find: finished with error: ${error}`)
            throw error
        }
    }

    async findOne(query: Object): Promise<IGroup> {
        try {
            const group = await Group.findOne(query).populate('contractors')

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
}
