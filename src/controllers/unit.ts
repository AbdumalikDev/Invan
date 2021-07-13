import { Response, NextFunction } from 'express'
import { IGetUserAuthInfoRequest } from './auth'
import { storage } from '../storage/main'
import catchAsync from '../utils/catchAsync'
import AppError from '../utils/appError'
import { IUnit } from '../models/Unit'

export class UnitController {
    create = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const { name, full_name } = req.body
        const org_id = req.employee.org_id

        const unit = await storage.unit.create({ org_id, name, full_name } as IUnit)

        res.status(200).json({
            success: true,
            status: 'unit',
            message: 'Unit has been successfully created',
            unit
        })
    })

    update = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const { name, full_name } = req.body
        const org_id = req.employee.org_id
        const _id = req.params.id

        const unit = await storage.unit.update({ org_id, _id }, {
            org_id,
            name,
            full_name
        } as IUnit)

        res.status(200).json({
            success: true,
            status: 'unit',
            message: 'Unit has been updated',
            unit
        })
    })

    delete = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const org_id = req.employee.org_id
        const _id = req.params.id
        await storage.unit.delete({ org_id, _id })

        res.status(200).json({
            success: true,
            status: 'unit',
            message: 'Unit has been deleted'
        })
    })

    getAll = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const org_id = req.employee.org_id

        const units = await storage.unit.find({ org_id })

        res.status(200).json({
            success: true,
            status: 'unit',
            message: 'All units',
            units
        })
    })
}
