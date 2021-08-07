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

        const check = warehouse.sub_warehouses.some(async (el: any) => {
            const ware = await storage.warehouse.findOne({ org_id, _id: el })
            return ware.id === parent_warehouse
        })
        if (check) {
            return next(new AppError(400, 'You cannot save in its sub_category', 'category'))
        }

        warehouse = await storage.warehouse.update({ org_id, _id }, {
            ...name,
            address,
            parent_warehouse
        } as IWarehouse)

        if (parent_warehouse) {
            if (parent_warehouse === warehouse.id) {
                return next(new AppError(400, 'You cannot save in itself', 'warehouse'))
            }

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

        const is_exist = await storage.receipt.find({ org_id, warehouse_id: _id })
        const is_exist1 = await storage.shipment.find({ org_id, warehouse_id: _id })
        const warehouse = await storage.warehouse.findOne({ org_id, _id })

        if (is_exist.length) {
            return next(
                new AppError(
                    400,
                    `${is_exist[0].doc_id} is using ${warehouse.name} warehouse`,
                    'warehouse'
                )
            )
        }

        if (is_exist1.length) {
            return next(
                new AppError(
                    400,
                    `${is_exist1[0].doc_id} is using ${warehouse.name} warehouse`,
                    'warehouse'
                )
            )
        }

        async function check(arr: any): Promise<any> {
            for (let i = 0; i < arr.length; i++) {
                let receipt = await storage.receipt.find({ org_id, warehouse_id: arr[i]._id })
                if (receipt.length) {
                    return receipt
                } else if (arr[i].sub_warehouses.length) {
                    const result = await check(arr[i].sub_warehouses)
                    if (result) return result
                }
            }
        }

        let result = await check(warehouse.sub_warehouses)
        if (result) {
            return next(
                new AppError(
                    400,
                    `${result[0].name} is using ${result[0].category.name}`,
                    'category'
                )
            )
        }

        async function deleteWarehouseSubs(arr: IWarehouse[]): Promise<void> {
            for (let i = 0; i < arr.length; i++) {
                await storage.warehouse.delete({ _id: arr[i]._id })
                if (arr[i].sub_warehouses.length) {
                    await deleteWarehouseSubs(arr[i].sub_warehouses as IWarehouse[])
                }
            }
        }

        await deleteWarehouseSubs(warehouse.sub_warehouses as IWarehouse[])

        if (warehouse.parent_warehouse) {
            await storage.warehouse.update(
                { org_id, _id: warehouse.parent_warehouse },
                { $pull: { sub_warehouses: warehouse.id } }
            )
        }

        await storage.warehouse.delete({ org_id, _id })

        let warehouses = await storage.warehouse.find({ org_id })

        warehouses = warehouses.filter((warehouse: IWarehouse) => !warehouse.parent_warehouse)

        res.status(200).json({
            success: true,
            status: 'warehouse',
            message: 'Warehouse has been successfully deleted',
            warehouses
        })
    })

    getAll = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const { org_id } = req.employee.employee_info

        let warehouses = await storage.warehouse.find({ org_id })

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
