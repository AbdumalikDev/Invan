import { Request, Response, NextFunction } from 'express'
import { IGetUserAuthInfoRequest } from './auth'
import { storage } from '../storage/main'
import catchAsync from '../utils/catchAsync'
import AppError from '../utils/appError'
import { IItem } from '../models/Item'
import { IAudit } from '../models/Audit'

export class ItemController {
    create = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const { product_id, cost, quantity, } = req.body
        const emp_id = req.employee.employee_info.id
        const org_id = req.employee.employee_info.org_id

        const item = await storage.item.create({
            product_id,
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
        const { product_id, cost, quantity, } = req.body
        const org_id = req.employee.employee_info.org_id
        const emp_id = req.employee.employee_info.id

        const item = await storage.item.update({ org_id, id: req.params.id }, {
            product_id,
            cost,
            quantity,
            org_id,
            emp_id
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

        await storage.item.delete({ org_id, id: req.params.id })

        await storage.audit.create({
            org_id,
            action: 'create',
            events: `${req.params.id} successfully created`
        } as IAudit)

        res.status(200).json({
            success: true,
            status: 'item',
            message: 'Item has been successfully deleted'
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
}
