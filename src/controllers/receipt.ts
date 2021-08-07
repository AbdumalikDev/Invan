import { Response, NextFunction } from 'express'
import { IGetUserAuthInfoRequest } from './auth'
import { storage } from '../storage/main'
import catchAsync from '../utils/catchAsync'
import { IReceipt } from '../models/Receipt'
import { IAudit } from '../models/Audit'
import { IItem } from '../models/Item'

export class ReceiptController {
    create = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const { warehouse_id, contractor_id, items, doc_id, is_checked } = req.body
        const { org_id, id: emp_id } = req.employee.employee_info

        const receipt = await storage.receipt.create({
            org_id,
            emp_id,
            warehouse_id,
            contractor_id,
            items,
            doc_id,
            is_checked
        } as IReceipt)

        items.forEach(async (item: IItem) => {
            const exist = await storage.item.find({ org_id, product_id: item.product_id })

            if (!exist.length) {
                await storage.item.create({
                    org_id,
                    emp_id,
                    product_id: item.product_id,
                    quantity: item.quantity,
                    cost: item.cost
                } as IItem)
            } else {
                const sum = exist[0].quantity + item.quantity
                await storage.item.update({ org_id, _id: exist[0].id }, { quantity: sum } as IItem)
            }
        })

        await storage.audit.create({
            org_id,
            action: 'create',
            events: `${receipt.id} successfully created`
        } as IAudit)

        res.status(200).json({
            success: true,
            status: 'receipt',
            message: 'Receipt has been successfully created',
            receipt
        })
    })

    update = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const { warehouse_id, contractor_id, items, doc_id, is_checked } = req.body
        const { org_id, _id: emp_id } = req.employee.employee_info
        const _id = req.params.id

        const receipt = await storage.receipt.update({ org_id, _id }, {
            emp_id,
            warehouse_id,
            contractor_id,
            items,
            doc_id,
            is_checked
        } as IReceipt)

        await storage.audit.create({
            org_id,
            action: 'update',
            events: `${receipt.id} successfully updated`
        } as IAudit)

        res.status(200).json({
            success: true,
            status: 'receipt',
            message: 'Receipt has been successfully updated',
            receipt
        })
    })

    delete = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const org_id = req.employee.employee_info.org_id
        const _id = req.params.id

        await storage.receipt.delete({ org_id, _id })

        await storage.audit.create({
            org_id,
            action: 'delete',
            events: `Receipt successfully created`
        } as IAudit)

        const receipts = await storage.receipt.find({ org_id })

        res.status(200).json({
            success: true,
            status: 'receipt',
            message: 'Receipt has been successfully deleted',
            receipts
        })
    })

    getAll = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const org_id = req.employee.employee_info.id

        const receipts = await storage.receipt.find({ org_id })

        res.status(200).json({
            success: true,
            status: 'receipt',
            message: 'All receipts',
            receipts
        })
    })

    getOne = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const org_id = req.employee.employee_info.org_id
        const _id = req.params.id

        const receipt = await storage.receipt.findOne({ org_id, _id })

        res.status(200).json({
            success: true,
            status: 'receipt',
            message: 'One receipt',
            receipt
        })
    })
}
