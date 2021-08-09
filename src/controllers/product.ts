import { Response, NextFunction } from 'express'
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

        const { id: emp_id, org_id } = req.employee.employee_info

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
            events: `${product._id} successfully created`
        } as IAudit)

        res.status(200).json({
            success: true,
            status: 'product',
            message: 'Product has been successfully created',
            product
        })
    })

    update = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const { org_id } = req.employee.employee_info
        const { id: _id } = req.params

        const product = await storage.product.update({ org_id, _id }, {
            ...req.body
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
        const ids: string[] = req.body
        let filteredIds: string[] = []
        const unDeleted: string[] = []

        const isExist = await storage.item.find({ org_id, product_id: { $in: ids } })
        if (isExist.length) {
            for (const { product_id } of isExist) {
                const { _id, name } = product_id as IProduct

                filteredIds = ids.filter((id: string) => {
                    if (id === _id) {
                        unDeleted.push(name)
                    }

                    return id !== _id
                })
            }
        }

        await storage.product.deleteMany({
            org_id,
            _id: { $in: isExist.length ? filteredIds : ids }
        })

        await storage.audit.create({
            org_id,
            action: 'delete',
            events: `Products successfully deleted`
        } as IAudit)

        const products = await storage.product.find({ org_id })

        res.status(200).json({
            success: true,
            status: `${isExist.length ? 'product-used' : 'product'}`,
            message: unDeleted.length
                ? `${unDeleted} products being used in item`
                : 'Product has been successfully deleted',
            products
        })
    })

    getAll = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const org_id = req.employee.employee_info.org_id

        const products = await storage.product.find({ org_id })

        res.status(200).json({
            success: true,
            status: 'product',
            message: 'All products',
            products
        })
    })

    getOne = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const org_id = req.employee.employee_info.org_id

        const product = await storage.product.findOne({ org_id, _id: req.params.id })

        res.status(200).json({
            success: true,
            status: 'product',
            message: 'One product',
            product
        })
    })

    search = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const org_id = req.employee.employee_info.org_id
        const search = req.params.search
        let products

        if (isNaN(search as any)) {
            products = await storage.product.find({ org_id, name: new RegExp(search, 'i') })
        } else {
            products = await storage.product.find({ org_id, SKU: new RegExp(search, 'i') })
        }

        res.status(200).json({
            success: true,
            status: 'product',
            message: 'Searched products',
            products
        })
    })
}
