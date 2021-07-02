import { Response, NextFunction } from 'express'
import { IGetUserAuthInfoRequest } from './auth'
import { storage } from '../storage/main'
import catchAsync from '../utils/catchAsync'
import AppError from '../utils/appError'
import { IUnit } from '../models/Unit'

export class UnitController {
    create = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const { name, full_name } = req.body

        const unit = await storage.unit.create({ name, full_name } as IUnit)

        res.status(200).json({
            success: true,
            status: 'unit',
            message: 'Unit has been successfully created',
            unit
        })
    })
}
