import { Response, NextFunction } from 'express'
import { IGetUserAuthInfoRequest } from './auth'
import { storage } from '../storage/main'
import catchAsync from '../utils/catchAsync'
import AppError from '../utils/appError'
import { ICategory } from '../models/Category'
import { IAudit } from '../models/Audit'

export class CategoryController {
    create = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const { name, parent_category } = req.body
        const { org_id } = req.employee.employee_info

        const category = await storage.category.create({
            org_id,
            name,
            parent_category
        } as ICategory)

        if (parent_category) {
            await storage.category.update(
                { org_id, _id: parent_category },
                { $push: { sub_categories: category._id } }
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
        const { org_id } = req.employee.employee_info
        const { id: _id } = req.params
        const { name, parent_category } = req.body

        let category = await storage.category.findOne({ org_id, _id })

        if (_id == parent_category)
            return next(new AppError(400, 'You can not update it', 'category'))

        if (category.parent_category) {
            await storage.category.update(
                { org_id, _id: category.parent_category },
                { $pull: { sub_categories: category.id } }
            )
        }

        category = await storage.category.update({ org_id, _id }, {
            ...req.body
        } as ICategory)

        if (parent_category) {
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
        const { org_id } = req.employee.employee_info
        const { id: _id } = req.params

        const is_exist = await storage.product.find({ org_id, category: _id })
        // const is_sub_Exist = await storage.category.find({ org_id, sub_categories: _id })
        // console.log(is_sub_Exist)
        let category = await storage.category.findOne({ org_id, _id })

        let is_exist_status: boolean = true

        if (!is_exist.length) {
            is_exist_status = false

            const category = await storage.category.findOne({ org_id, _id })

            category.sub_categories.forEach(async (_id: string) => {
                await storage.category.delete({ org_id, _id })
            })

            await storage.category.update(
                { org_id, _id: category.parent_category },
                { $pull: { sub_categories: category.id } }
            )

            await storage.category.delete({ org_id, _id })
        }

        category.sub_categories.forEach(async (_id: string) => {
            let isSubExist = await storage.category.find({ _id })

            if (isSubExist.length) {
                return next(
                    new AppError(
                        400,
                        `${isSubExist[0].name} is using ${
                            (await storage.category.findOne({ _id, org_id })).name
                        }`,
                        'category'
                    )
                )
            }
            await storage.category.delete({ org_id, _id })
        })

        let categories = await storage.category.find({ org_id })
        categories = categories.filter((el: ICategory) => !el.parent_category)

        await storage.category.delete({ org_id, _id })

        await storage.audit.create({
            org_id,
            action: 'delete',
            events: `Categories successfully deleted`
        } as IAudit)

        res.status(200).json({
            success: true,
            status: 'category',
            message: is_exist_status
                ? `Category is being used in ${is_exist[0].name}`
                : 'Category has been deleted',
            categories
        })
    })

    getAll = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const { org_id } = req.employee.employee_info

        let categories = await storage.category.find({ org_id })

        categories = categories.filter((el: ICategory) => !el.parent_category)

        res.status(200).json({
            success: true,
            status: 'category',
            message: 'All categories',
            categories: categories
        })
    })

    getOne = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const { org_id } = req.employee.employee_info

        const category = await storage.category.findOne({ org_id, _id: req.params.id })

        res.status(200).json({
            success: true,
            status: 'category',
            message: 'One category',
            category
        })
    })
}
