import { Response, NextFunction } from 'express'
import { IGetUserAuthInfoRequest } from './auth'
import { storage } from '../storage/main'
import catchAsync from '../utils/catchAsync'
import { IGroupWarehouse } from '../models/Group_wearhouse'

export class GroupWarehouseController {
    create = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const { name, sub_groups } = req.body
        const org_id = req.employee.employee_info.org_id

        const groupWarehouse = await storage.groupWarehouse.create({
            org_id,
            name,
            sub_groups
        } as IGroupWarehouse)

        res.status(200).json({
            success: true,
            status: 'groupWarehouse',
            message: 'Group has been successfully created',
            groupWarehouse
        })
    })

    update = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const { name, sub_groups } = req.body
        const org_id = req.employee.employee_info.org_id
        const _id = req.params.id

        const groupWarehouse = await storage.groupWarehouse.update({ org_id, _id }, {
            name,
            sub_groups
        } as IGroupWarehouse)

        res.status(200).json({
            success: true,
            status: 'groupWarehouse',
            message: 'Group has been successfully updated',
            groupWarehouse
        })
    })

    getOne = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const org_id = req.employee.employee_info.org_id

        const groupWarehouse = await storage.groupWarehouse.findOne({ org_id, _id: req.params.id })

        res.status(200).json({
            success: true,
            status: 'groupWarehouse',
            message: 'One groupWarehouse',
            groupWarehouse
        })
    })

    getAll = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const org_id = req.employee.employee_info.org_id

        const groups = await storage.groupWarehouse.findAndPopulate({ org_id })

        res.status(200).json({
            success: true,
            status: 'groupWarehouse',
            message: 'All groups',
            groups
        })
    })

    delete = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const org_id = req.employee.employee_info.org_id
        const _id = req.params.id

        const groupWarehouse = await storage.groupWarehouse.delete({ org_id, _id })

        res.status(200).json({
            success: true,
            status: 'groupWarehouse',
            message: 'Group has been successfully deleted',
            groupWarehouse
        })
    })
}
