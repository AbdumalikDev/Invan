import { Request, Response, NextFunction } from 'express'
import { IGetUserAuthInfoRequest } from './auth'
import { storage } from '../storage/main'
import catchAsync from '../utils/catchAsync'
import AppError from '../utils/appError'
import { IWarehouse } from '../models/Warehouse'
import { IAudit } from '../models/Audit'

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

        const isSubCategoryExist = await storage.warehouse.find({
            org_id,
            sub_warehouses: { $in: warehouses }
        })

        if (isSubCategoryExist.length) {
            return next(
                new AppError(
                    400,
                    'Sorry this warehouse is being used in sub_warehouses ',
                    'warehouse'
                )
            )
        }
        await storage.warehouse.deleteMany({ org_id, _id: { $in: warehouses } })

        for (let { sub_warehouse, warehouse } of sub_warehouses) {
            await storage.warehouse.update(
                { org_id, _id: warehouse },
                { $pull: { sub_warehouses: sub_warehouse } }
            )
        }

        await storage.audit.create({
            org_id,
            action: 'create',
            events: `${req.params.id} successfully created`
        } as IAudit)

        const allWarehouses = await storage.warehouse.find({ org_id })

        res.status(200).json({
            success: true,
            status: 'warehouse',
            message: 'Warehouse has been successfully deleted',
            warehouses: allWarehouses
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
