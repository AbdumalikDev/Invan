import { Response, NextFunction } from 'express'
import { IGetUserAuthInfoRequest } from './auth'
import { storage } from '../storage/main'
import catchAsync from '../utils/catchAsync'
import { ICategory } from '../models/Category'
import { IAudit } from '../models/Audit'
import AppError from '../utils/appError'
import { IProduct } from '../models/Product'

export class CategoryController {
    create = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const { name, parent_category } = req.body
        const org_id = req.employee.employee_info.org_id

        const category = await storage.category.create({
            org_id,
            name,
            parent_category
        } as ICategory)

        if (parent_category) {
            await storage.category.update(
                { org_id, _id: parent_category },
                { $push: { sub_categories: category.id } }
            )
        }

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
        const { name, parent_category } = req.body

        let category = await storage.category.findOne({ org_id, _id })

        if (category.parent_category) {
            await storage.category.update(
                { org_id, _id: category.parent_category },
                { $pull: { sub_categories: category.id } }
            )
        }
        const check = category.sub_categories.some(async (el: any) => {
            const cat = await storage.category.findOne({ org_id, _id: el.id })
            return cat.id === parent_category
        })
        if (check) {
            return next(new AppError(400, 'You cannot save in its sub_category', 'category'))
        }

        category = await storage.category.update({ org_id, _id }, {
            name,
            parent_category
        } as ICategory)

        if (parent_category) {
            if (parent_category === category.id) {
                return next(new AppError(400, 'You cannot save in itself', 'category'))
            }

            await storage.category.update(
                { org_id, _id: parent_category },
                { $push: { sub_categories: category.id } }
            )
        }

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
        const _id = req.params.id

        const is_exist = await storage.product.find({ org_id, category: _id })
        const category = await storage.category.findOne({ org_id, _id })

        if (is_exist.length) {
            return next(
                new AppError(
                    400,
                    `${is_exist[0].name} is using ${category.name} category`,
                    'category'
                )
            )
        }

        async function catInProduct(arr: ICategory[]): Promise<IProduct[] | undefined> {
            for (let i = 0; i < arr.length; i++) {
                let product = await storage.product.find({ org_id, category: arr[i]._id })
                if (product.length) {
                    return product
                } else if (arr[i].sub_categories && arr[i].sub_categories.length) {
                    const result = await catInProduct(arr[i].sub_categories as ICategory[])
                    if (result) return result
                }
            }
        }

        let result = await catInProduct(category.sub_categories as ICategory[])

        if (result) {
            return next(
                new AppError(
                    400,
                    `${result[0].name} is using ${(result[0].category as ICategory).name}`,
                    'category'
                )
            )
        }

        async function deleteCategorySubs(arr: ICategory[]): Promise<void> {
            for (let i = 0; i < arr.length; i++) {
                await storage.category.delete({ _id: arr[i]._id })
                if (arr[i].sub_categories.length) {
                    await deleteCategorySubs(arr[i].sub_categories as ICategory[])
                }
            }
        }

        await deleteCategorySubs(category.sub_categories as ICategory[])

        if (category.parent_category) {
            await storage.category.update(
                { org_id, _id: category.parent_category },
                { $pull: { sub_categories: category.id } }
            )
        }

        await storage.category.delete({ org_id, _id })

        let categories = await storage.category.find({ org_id })

        categories = categories.filter((category: ICategory) => !category.parent_category)

        await storage.audit.create({
            org_id,
            action: 'delete',
            events: 'Categories successfully deleted'
        } as IAudit)

        res.status(200).json({
            success: true,
            status: 'category',
            message: 'Category has been deleted',
            categories
        })
    })

    getOne = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const org_id = req.employee.employee_info.org_id

        const category = await storage.category.findOne({ org_id, _id: req.params.id })

        res.status(200).json({
            success: true,
            status: 'category',
            message: 'All categories',
            category
        })
    })

    getAll = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const { org_id } = req.employee.employee_info

        const categories = await storage.category.find({ org_id })

        res.status(200).json({
            success: true,
            status: 'category',
            message: 'All Category',
            categories
        })
    })
}
