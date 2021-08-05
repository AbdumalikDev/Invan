import { Response, NextFunction } from 'express'
import { IGetUserAuthInfoRequest } from './auth'
import { storage } from '../storage/main'
import catchAsync from '../utils/catchAsync'
import { IWarehouse } from '../models/Warehouse'
import { IAudit } from '../models/Audit'
import AppError from '../utils/appError'

export class WarehouseController {
    create = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const { name, address, parent_warehouse } = req.body
        const emp_id = req.employee.employee_info.id
        const org_id = req.employee.employee_info.org_id

        const warehouse = await storage.warehouse.create({
            org_id,
            emp_id,
            name,
            address,
            parent_warehouse
        } as IWarehouse)

        if (parent_warehouse) {
            await storage.warehouse.update(
                { org_id, _id: parent_warehouse },
                { $push: { sub_warehouses: warehouse.id } }
            )
        }

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
        const { name, address, parent_warehouse } = req.body

        let warehouse = await storage.warehouse.findOne({ org_id, _id })

        if (warehouse.parent_warehouse) {
            await storage.warehouse.update(
                { org_id, _id: warehouse.parent_warehouse },
                { $pull: { sub_warehouses: warehouse.id } }
            )
        }

        warehouse = await storage.warehouse.update({ org_id, _id }, {
            ...name,
            address,
            parent_warehouse
        } as IWarehouse)

        if (parent_warehouse) {
            await storage.warehouse.update(
                { org_id, _id: parent_warehouse },
                { $push: { sub_warehouses: warehouse } }
            )
        }

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
        const _id = req.params.id

        const warehouse = await storage.warehouse.findOne({ org_id, _id })

        const isExist = await storage.shipment.find({ org_id, warehouse: warehouse.id })
        const isExist1 = await storage.receipt.find({ org_id, warehouse: warehouse.id })
        let isExistStatus: boolean = true
        let isExistMessage: string = ''

        if (!isExist.length && !isExist1.length) {
            isExistStatus = false
            await storage.warehouse.delete({ org_id, _id })
        }

        if (isExist.length) {
            isExistMessage = 'shipment'
        }

        if (isExist1.length) {
            isExistMessage = 'receipt'
        }

        await storage.audit.create({
            org_id,
            action: 'create',
            events: `Warehouses successfully deleted`
        } as IAudit)

        const warehouses = await storage.warehouse.find({ org_id })

        res.status(200).json({
            success: true,
            status: 'warehouse',
            message: isExistStatus
                ? isExistMessage === 'receipt'
                    ? `${isExist1[0].doc_id} is using this warehouse`
                    : `${isExist[0].doc_id} is using this warehouse`
                : 'Warehouse has been successfully deleted',
            warehouses
        })
    })

    getAll = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const { org_id } = req.employee.employee_info

        let warehouses = await storage.warehouse.find({ org_id })
        warehouses = warehouses.filter((warehouse: IWarehouse) => !warehouse.parent_warehouse)

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
