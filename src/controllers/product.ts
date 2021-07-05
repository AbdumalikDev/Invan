import { Request, Response, NextFunction } from 'express'
import { IGetUserAuthInfoRequest } from './auth'
import { storage } from '../storage/main'
import catchAsync from '../utils/catchAsync'
import AppError from '../utils/appError'
import { IProduct } from '../models/Product'
import { IAudit } from '../models/Audit'

export class ProductController {
    create = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const { name, description, unit, category } = req.body
        const employee_id = req.employee.employee_info.id
        const org_id = req.employee.employee_info.org_id

        const product = await storage.product.create({
            name,
            description,
            employee_id,
            org_id,
            unit,
            category
        } as IProduct)

        await storage.audit.create({
            org_id,
            action: 'create',
            events: `<a href="http://localhost:3000/product/${product.id}">Product</a> successfully created`
        } as IAudit)

        res.status(200).json({
            success: true,
            status: 'product',
            message: 'Product has been successfully created',
            product
        })
    })

    update = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const { name, description, unit, category } = req.body
        const org_id = req.employee.employee_info.org_id

        let product = await storage.product.findById(req.params.id)

        if (product.org_id !== org_id) {
            next(new AppError(401, 'Authorization denied', 'product'))
        }

        product = await storage.product.update(req.params.id, {
            name,
            description,
            unit,
            category
        } as IProduct)

        await storage.audit.create({
            org_id,
            action: 'update',
            events: `<a href="http://localhost:3000/product/${product.id}">Product</a> successfully updated`
        } as IAudit)

        res.status(200).json({
            success: true,
            status: 'product',
            message: 'Product has been successfully updated',
            product
        })
    })

    delete = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        await storage.product.delete(req.params.id)

        res.status(200).json({
            success: true,
            status: 'product',
            message: 'Product has been successfully deleted'
        })
    })

    findOne = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        let product = await storage.product.findById(req.params.id)

        res.status(200).json({
            success: true,
            status: 'product',
            message: 'Product has been successfully updated',
            product
        })
    })
}
