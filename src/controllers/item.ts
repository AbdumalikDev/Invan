import { Response, NextFunction } from 'express'
import { IGetUserAuthInfoRequest } from './auth'
import { storage } from '../storage/main'
import catchAsync from '../utils/catchAsync'
import { IItem } from '../models/Item'
import { IAudit } from '../models/Audit'

export class ItemController {
    create = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const { product, cost, quantity } = req.body
        const emp_id = req.employee.employee_info.id
        const org_id = req.employee.employee_info.org_id

        const item = await storage.item.create({
            product,
            cost,
            quantity,
            org_id,
            emp_id
        } as IItem)

        await storage.audit.create({
            org_id,
            action: 'create',
            events: `${item.id} successfully created`
        } as IAudit)

        res.status(200).json({
            success: true,
            status: 'item',
            message: 'Item has been successfully created',
            item
        })
    })

    update = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const org_id = req.employee.employee_info.org_id

        const item = await storage.item.update({ org_id, _id: req.params.id }, {
            ...req.body
        } as IItem)

        await storage.audit.create({
            org_id,
            action: 'update',
            events: `${item.id} successfully updated`
        } as IAudit)

        res.status(200).json({
            success: true,
            status: 'item',
            message: 'Item has been successfully updated',
            item
        })
    })

    delete = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const org_id = req.employee.employee_info.org_id
        const ids = req.body

        await storage.item.deleteMany({ org_id, _id: { $in: ids } })

        await storage.audit.create({
            org_id,
            action: 'delete',
            events: `Item successfully deleted`
        } as IAudit)

        const items = await storage.item.find({ org_id })

        res.status(200).json({
            success: true,
            status: 'item',
            message: 'Item has been successfully deleted',
            items
        })
    })

    getAll = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const org_id = req.employee.employee_info.org_id

        let items = await storage.item.find({ org_id })

        res.status(200).json({
            success: true,
            status: 'item',
            message: 'All items',
            items
        })
    })

    getOne = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const org_id = req.employee.employee_info.org_id
        const _id = req.params.id

        const item = await storage.item.findOne({ org_id, _id })

        res.status(200).json({
            success: true,
            status: 'item',
            message: 'One item',
            item
        })
    })
}
