import { Response, NextFunction } from 'express'
import { IGetUserAuthInfoRequest } from './auth'
import { storage } from '../storage/main'
import catchAsync from '../utils/catchAsync'
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
        const _id = req.params.id

        const category = await storage.category.delete({ org_id, _id })

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
}
