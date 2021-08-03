import { Response, NextFunction } from 'express'
import { IGetUserAuthInfoRequest } from './auth'
import { storage } from '../storage/main'
import catchAsync from '../utils/catchAsync'
import { IGroup } from '../models/Group'

export class GroupController {
    create = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const { name, contractors } = req.body
        const { org_id } = req.employee.employee_info

        const group = await storage.group.create({
            org_id,
            name,
            contractors
        } as IGroup)

        res.status(200).json({
            success: true,
            status: 'group',
            message: 'Group has been successfully created',
            group
        })
    })

    update = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const { name, contractors } = req.body
        const { org_id } = req.employee.employee_info
        const { id: _id } = req.params

        const group = await storage.group.update({ org_id, _id }, {
            name,
            contractors
        } as IGroup)

        res.status(200).json({
            success: true,
            status: 'group',
            message: 'Group has been successfully updated',
            group
        })
    })

    delete = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const { org_id } = req.employee.employee_info
        const ids = req.body

        await storage.group.deleteMany({ org_id, _id: { $in: ids } })

        const groups = await storage.group.find({ org_id })

        res.status(200).json({
            success: true,
            status: 'group',
            message: 'Group has been successfully deleted',
            groups
        })
    })

    getAll = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const { org_id } = req.employee.employee_info

        const groups = await storage.group.find({ org_id })

        res.status(200).json({
            success: true,
            status: 'group',
            message: 'All groups',
            groups
        })
    })

    getOne = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const { org_id } = req.employee.employee_info

        const group = await storage.group.findOne({ org_id, _id: req.params.id })

        res.status(200).json({
            success: true,
            status: 'group',
            message: 'One group',
            group
        })
    })
}
