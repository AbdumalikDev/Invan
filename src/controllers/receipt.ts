import { Response, NextFunction } from 'express'
import { IGetUserAuthInfoRequest } from './auth'
import { storage } from '../storage/main'
import catchAsync from '../utils/catchAsync'
import { IReceipt } from '../models/Receipt'
import { IAudit } from '../models/Audit'

export class ReceiptController {
    create = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const { warehouse_id, contractor_id, items, doc_id, is_checked } = req.body
        const org_id = req.employee.employee_info.org_id
        const emp_id = req.employee.employee_info.id

        const receipt = await storage.receipt.create({
            org_id,
            emp_id,
            warehouse_id,
            contractor_id,
            items,
            doc_id,
            is_checked
        } as IReceipt)

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
        const org_id = req.employee.org_id
        const emp_id = req.employee.id

        const receipt = await storage.receipt.update({ org_id, id: req.params.id }, {
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
        const org_id = req.employee.org_id

        const dbRes = await storage.receipt.delete({ org_id, id: req.params.id })

        await storage.audit.create({
            org_id,
            action: 'delete',
            events: `${dbRes} successfully created`
        } as IAudit)

        res.status(200).json({
            success: true,
            status: 'receipt',
            message: 'Receipt has been successfully deleted'
        })
    })

    getAll = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const org_id = req.employee.id

        const receipts = await storage.receipt.find({ org_id })

        res.status(200).json({
            success: true,
            status: 'receipt',
            message: 'All receipts received',
            receipts
        })
    })
}
