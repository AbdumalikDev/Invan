import { Request, Response, NextFunction } from 'express'
import { IGetUserAuthInfoRequest } from './auth'
import { storage } from '../storage/main'
import catchAsync from '../utils/catchAsync'
import { IProduct } from '../models/Product'
import { IAudit } from '../models/Audit'

export class ProductController {
    create = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const {
            name,
            description,
            bar_code,
            SKU,
            vendor_code,
            weight,
            volume,
            VAT,
            is_shared,
            unit,
            category
        } = req.body

        const emp_id = req.employee.employee_info.id
        const org_id = req.employee.employee_info.org_id

        const product = await storage.product.create({
            org_id,
            emp_id,
            name,
            description,
            bar_code,
            SKU,
            vendor_code,
            weight,
            volume,
            VAT,
            is_shared,
            unit,
            category
        } as IProduct)

        await storage.audit.create({
            org_id,
            action: 'create',
            events: `${product.id} successfully created`
        } as IAudit)

        res.status(200).json({
            success: true,
            status: 'product',
            message: 'Product has been successfully created',
            product
        })
    })

    update = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const {
            name,
            description,
            bar_code,
            SKU,
            vendor_code,
            weight,
            volume,
            VAT,
            is_shared,
            unit,
            category
        } = req.body
        const org_id = req.employee.employee_info.org_id

        const product = await storage.product.update({ org_id, _id: req.params.id }, {
            name,
            description,
            bar_code,
            SKU,
            vendor_code,
            weight,
            volume,
            VAT,
            is_shared,
            unit,
            category
        } as IProduct)

        await storage.audit.create({
            org_id,
            action: 'update',
            events: `${product.id} successfully updated`
        } as IAudit)

        res.status(200).json({
            success: true,
            status: 'product',
            message: 'Product has been successfully updated',
            product
        })
    })

    delete = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const org_id = req.employee.employee_info.org_id

        await storage.product.delete({ org_id, id: req.params.id })

        await storage.audit.create({
            org_id,
            action: 'create',
            events: `${req.params.id} successfully created`
        } as IAudit)

        res.status(200).json({
            success: true,
            status: 'product',
            message: 'Product has been successfully deleted'
        })
    })

    getAll = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const org_id = req.employee.employee_info.org_id

        let products = await storage.product.find({ org_id })

        res.status(200).json({
            success: true,
            status: 'product',
            message: 'All products',
            products
        })
    })
}
