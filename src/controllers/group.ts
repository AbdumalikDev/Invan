import { Response, NextFunction } from 'express'
import { IGetUserAuthInfoRequest } from './auth'
import { storage } from '../storage/main'
import catchAsync from '../utils/catchAsync'
import { IGroup } from '../models/Group'

export class GroupController {
    create = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const { name, contractor } = req.body
        const org_id = req.employee.employee_info.org_id

        const group = await storage.group.create({
            org_id,
            name,
            contractor
        } as IGroup)

        res.status(200).json({
            success: true,
            status: 'group',
            message: 'Group has been successfully created',
            group
        })
    })

    update = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const { name, contractor } = req.body
        const org_id = req.employee.employee_info.org_id
        const _id = req.params.id

        const group = await storage.group.update({ org_id, _id }, {
            name,
            contractor
        } as IGroup)

        res.status(200).json({
            success: true,
            status: 'group',
            message: 'Group has been successfully updated',
            group
        })
    })

    getOne = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const org_id = req.employee.employee_info.org_id

        const group = await storage.group.findOne({ org_id, _id: req.params.id })

        res.status(200).json({
            success: true,
            status: 'group',
            message: 'One group',
            group
        })
    })

    getAll = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const org_id = req.employee.employee_info.org_id

        const groups = await storage.group.findAndPopulate({ org_id })

        res.status(200).json({
            success: true,
            status: 'group',
            message: 'All groups',
            groups
        })
    })

    delete = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const org_id = req.employee.employee_info.org_id
        const _id = req.params.id

        const group = await storage.group.delete({ org_id, _id })

        res.status(200).json({
            success: true,
            status: 'group',
            message: 'Group has been successfully deleted',
            group
        })
    })
}
