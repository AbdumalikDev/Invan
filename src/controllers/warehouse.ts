import { Request, Response, NextFunction } from 'express'
import { IGetUserAuthInfoRequest } from './auth'
import { storage } from '../storage/main'
import catchAsync from '../utils/catchAsync'
import { IWarehouse } from '../models/Warehouse'
import { IAudit } from '../models/Audit'
import AppError from '../utils/appError'

export class WarehouseController {
    create = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const { name, address, sub_warehouses } = req.body
        const emp_id = req.employee.employee_info.id
        const org_id = req.employee.employee_info.org_id

        const warehouse = await storage.warehouse.create({
            name,
            address,
            sub_warehouses,
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
        const org_id = req.employee.employee_info.org_id
        const _id = req.params.id

        const warehouse = await storage.warehouse.update({ org_id, _id }, {
            ...req.body
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
        const { warehouses, sub_warehouses } = req.body

        const isExist1 = await storage.warehouse.find({
            org_id,
            sub_warehouses: { $in: warehouses }
        })

        if (isExist1.length !== 0) {
            return next(
                new AppError(
                    401,
                    'Sorry this warehouse is being used in sub_warehouses',
                    'warehouse'
                )
            )
        }

        await storage.warehouse.deleteMany({ org_id, _id: { $in: warehouses } })

        await sub_warehouses.forEach(async (el: { warehouse: string; sub_warehouse: string }) => {
            await storage.warehouse.update(
                { org_id, _id: el.warehouse },
                { $pull: { sub_warehouses: el.sub_warehouse } }
            )
        })

        await storage.audit.create({
            org_id,
            action: 'create',
            events: `Warehouses successfully deleted`
        } as IAudit)

        const warehouse = await storage.warehouse.find({ org_id })

        res.status(200).json({
            success: true,
            status: 'warehouse',
            message: 'Warehouse has been successfully deleted',
            warehouse
        })
    })

    getAll = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const org_id = req.employee.employee_info.org_id

        const warehouses = await storage.warehouse.find({ org_id })

        res.status(200).json({
            success: true,
            status: 'warehouse',
            message: 'All warehouses',
            warehouses
        })
    })

    getOne = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const org_id = req.employee.employee_info.org_id
        const _id = req.params.id

        const warehouse = await storage.warehouse.findOne({ org_id, _id })

        res.status(200).json({
            success: true,
            status: 'warehouse',
            message: 'One warehouse',
            warehouse
        })
    })
}
