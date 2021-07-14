import { Request, Response, NextFunction } from 'express'
import { IGetUserAuthInfoRequest } from './auth'
import { storage } from '../storage/main'
import catchAsync from '../utils/catchAsync'
import AppError from '../utils/appError'
import { IWarehouse } from '../models/Warehouse'
import { IAudit } from '../models/Audit'

export class WarehouseContoller {
    create = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const { name, group } = req.body
        const emp_id = req.employee.employee_info.id
        const org_id = req.employee.employee_info.org_id

        const warehouse = await storage.warehouse.create({
            name,
            group,
            org_id,
            emp_id
        } as IWarehouse)

        await storage.audit.create({
            org_id,
            action: 'create',
            events: `${warehouse.id} successfully created`
        } as IAudit)

        res.status(200).json({
            success: true,
            status: 'warehouse',
            message: 'Warehouse has been successfully created',
            warehouse
        })
    })

    update = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const { name, group } = req.body
        const org_id = req.employee.employee_info.org_id
        const emp_id = req.employee.employee_info.id

        const warehouse = await storage.warehouse.update({ org_id, id: req.params.id }, {
            name,
            group,
            org_id,
            emp_id
        } as IWarehouse)

        await storage.audit.create({
            org_id,
            action: 'update',
            events: `${warehouse.id} successfully updated`
        } as IAudit)

        res.status(200).json({
            success: true,
            status: 'warehouse',
            message: 'Warehouse has been successfully updated',
            warehouse
        })
    })

    delete = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const org_id = req.employee.employee_info.org_id
        await storage.warehouse.delete({ org_id, id: req.params.id })

        await storage.audit.create({
            org_id,
            action: 'create',
            events: `${req.params.id} successfully created`
        } as IAudit)

        res.status(200).json({
            success: true,
            status: 'warehouse',
            message: 'Warehouse has been successfully deleted'
        })
    })

    getAll = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const org_id = req.employee.employee_info.org_id

        let items = await storage.warehouse.find({ org_id })

        res.status(200).json({
            success: true,
            status: 'warehouse',
            message: 'All items',
            items
        })
    })
}
