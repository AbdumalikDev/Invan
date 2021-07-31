import { Response, NextFunction } from 'express'
import { storage } from '../storage/main'
import catchAsync from '../utils/catchAsync'
import { IGetUserAuthInfoRequest } from './auth'

export class AuditController {
    getAll = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const org_id = req.employee.employee_info.org_id

        const audits = await storage.audit.find({ org_id })

        res.status(200).json({
            success: true,
            status: 'audit',
            message: 'All audits',
            audits
        })
    })
}
