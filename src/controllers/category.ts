import { Response, NextFunction } from 'express'
import { IGetUserAuthInfoRequest } from './auth'
import { storage } from '../storage/main'
import catchAsync from '../utils/catchAsync'
import AppError from '../utils/appError'
import { ICategory } from '../models/Category'

export class CategoryController {
    create = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const { name, sub_categories } = req.body
        const org_id = req.employee.employee_info.org_id

        const category = await storage.category.create({
            org_id,
            name,
            sub_categories
        } as ICategory)

        res.status(200).json({
            success: true,
            status: 'category',
            message: 'Category has been successfully created',
            category
        })
    })

    update = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const { name, sub_categories } = req.body
        const org_id = req.employee.employee_info.org_id
        const _id = req.params.id

        const category = await storage.category.update({ org_id, _id }, {
            name,
            sub_categories
        } as ICategory)

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

        const exist = await storage.category.find({ org_id, sub_categories: { $in: categories } })

        if (exist.length !== 0) {
            return next(new AppError(401, 'Sorry this category is being used', 'category'))
        }

        await storage.category.deleteMany({ org_id, _id: { $in: categories } })

        await sub_categories.forEach(async (el: { category: string; sub_category: string }) => {
            await storage.category.update(
                { org_id, _id: el.category },
                { $pull: { sub_categories: el.sub_category } }
            )
        })

        const category = await storage.category.find({ org_id })

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
