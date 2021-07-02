import { Response, NextFunction } from 'express'
import { IGetUserAuthInfoRequest } from './auth'
import { storage } from '../storage/main'
import catchAsync from '../utils/catchAsync'
import { ICategory } from '../models/Category'

export class CategoryController {
    create = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const { name, taken_sub_categories } = req.body
        const sub_categories: Object[] = []

        taken_sub_categories.forEach(async (id: string) => {
            const category = await storage.category.findById(id)
            sub_categories.push(category)
        })

        const category = await storage.category.create({ name, sub_categories } as ICategory)

        res.status(200).json({
            success: true,
            status: 'category',
            message: 'Category has been successfully created',
            category
        })
    })
}
