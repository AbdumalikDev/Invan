import { Response, NextFunction } from 'express'
import { IGetUserAuthInfoRequest } from './auth'
import { storage } from '../storage/main'
import catchAsync from '../utils/catchAsync'
import { IUnit } from '../models/Unit'
import AppError from '../utils/appError'
import { IAudit } from '../models/Audit'

export class UnitController {
    create = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const { name, full_name } = req.body
        const org_id = req.employee.employee_info.org_id

        const isUnitExist = await storage.unit.find({ org_id, name })
        if (isUnitExist.length) {
            return next(
                new AppError(
                    400,
                    `${isUnitExist.map((unit) => unit.name).join('')} is already exist`,
                    'unit'
                )
            )
        }
        const unit = await storage.unit.create({ org_id, name, full_name } as IUnit)

        await storage.audit.create({
            org_id,
            action: 'create',
            events: `${unit._id} successfully created`
        } as IAudit)

        res.status(200).json({
            success: true,
            status: 'unit',
            message: 'Unit has been successfully created',
            unit
        })
    })

    update = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const org_id = req.employee.employee_info.org_id
        const _id = req.params.id

        const unit = await storage.unit.update({ org_id, _id }, {
            ...req.body
        } as IUnit)

        await storage.audit.create({
            org_id,
            action: 'update',
            events: `${unit._id} successfully updated`
        } as IAudit)

        res.status(200).json({
            success: true,
            status: 'unit',
            message: 'Unit has been updated',
            unit
        })
    })

    delete = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const org_id = req.employee.employee_info.org_id
        const { ids } = req.body
        let filteredIds: string[] = []
        const unDeleted: string[] = []

        const isExist = await storage.product.find({ org_id, unit: { $in: ids } })

        if (isExist.length) {
            for (const { unit } of isExist) {
                const { _id, name } = unit as IUnit

                filteredIds = ids.filter((id: string) => {
                    if (id === _id) {
                        unDeleted.push(name)
                    }

                    return id !== _id
                })
            }
        }

        await storage.unit.deleteMany({ org_id, _id: { $in: filteredIds } })

        await storage.audit.create({
            org_id,
            action: 'delete',
            events: ` Units successfully deleted`
        } as IAudit)

        const units = await storage.unit.find({ org_id })

        res.status(200).json({
            success: true,
            status: 'unit',
            message: unDeleted.length
                ? `${unDeleted} units cannot be deleted`
                : 'Units have been deleted',
            units
        })
    })

    getAll = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const org_id = req.employee.employee_info.org_id

        const units = await storage.unit.find({ org_id })

        res.status(200).json({
            success: true,
            status: 'unit',
            message: 'All units',
            units
        })
    })

    getOne = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const org_id = req.employee.employee_info.org_id

        const unit = await storage.unit.findOne({ org_id, _id: req.params.id })

        res.status(200).json({
            success: true,
            status: 'unit',
            message: 'Unit found',
            unit
        })
    })
}
