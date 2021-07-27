import { Response, NextFunction } from 'express'
import { IGetUserAuthInfoRequest } from './auth'
import { storage } from '../storage/main'
import catchAsync from '../utils/catchAsync'
import AppError from '../utils/appError'
import { ICategory } from '../models/Category'
import { IAudit } from '../models/Audit'

export class CategoryController {
    create = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const { name, sub_categories } = req.body
        const org_id = req.employee.employee_info.org_id

        const category = await storage.category.create({
            org_id,
            name,
            sub_categories
        } as ICategory)

        await storage.audit.create({
            org_id,
            action: 'create',
            events: `${category._id} successfully created`
        } as IAudit)

        res.status(200).json({
            success: true,
            status: 'category',
            message: 'Category has been successfully created',
            category
        })
    })

    update = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const org_id = req.employee.employee_info.org_id
        const _id = req.params.id

        const category = await storage.category.update({ org_id, _id }, {
            ...req.body
        } as ICategory)

        await storage.audit.create({
            org_id,
            action: 'update',
            events: `${category._id} successfully updated`
        } as IAudit)

        res.status(200).json({
            success: true,
            status: 'category',
            message: 'Category has been successfully updated',
            category
        })
    })

    delete = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const org_id = req.employee.employee_info.org_id
        const { categories, sub_categories } = req.body

        const isExist = await storage.product.find({ org_id, category: { $in: categories } })

        if (isExist.length !== 0) {
            return next(
                new AppError(401, 'Sorry this category is being used in products', 'category')
            )
        }

        const isExist1 = await storage.category.find({
            org_id,
            sub_categories: { $in: categories }
        })

        if (isExist1.length !== 0) {
            return next(
                new AppError(401, 'Sorry this category is being used in sub_categories', 'category')
            )
        }

        await storage.category.deleteMany({ org_id, _id: { $in: categories } })

        await sub_categories.forEach(async (el: { category: string; sub_category: string }) => {
            await storage.category.update(
                { org_id, _id: el.category },
                { $pull: { sub_categories: el.sub_category } }
            )
        })

        const category = await storage.category.find({ org_id })

        await storage.audit.create({
            org_id,
            action: 'delete',
            events: `Categories successfully deleted`
        } as IAudit)

        res.status(200).json({
            success: true,
            status: 'category',
            message: 'Category has been successfully deleted',
            category
        })
    })

    getAll = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const org_id = req.employee.employee_info.org_id

        const categories = await storage.category.find({ org_id })

        res.status(200).json({
            success: true,
            status: 'category',
            message: 'All categories',
            categories
        })
    })

    getOne = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const org_id = req.employee.employee_info.org_id

        const category = await storage.category.findOne({ org_id, _id: req.params.id })

        res.status(200).json({
            success: true,
            status: 'category',
            message: 'One category',
            category
        })
    })
}
