import { Response, NextFunction } from 'express'
import { IGetUserAuthInfoRequest } from './auth'
import { storage } from '../storage/main'
import catchAsync from '../utils/catchAsync'
import { IOutcome } from '../models/Outcome'
import { IAudit } from '../models/Audit'

export class OutcomeController {
    create = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const org_id = req.employee.employee_info.org_id
        const emp_id = req.employee.employee_info.id
        const { doc_id, payment_type, sum } = req.body

        const outcome = await storage.outcome.create({
            org_id,
            emp_id,
            doc_id,
            payment_type,
            sum
        } as IOutcome)

        await storage.audit.create({
            org_id,
            action: 'create',
            events: `${outcome.id} successfully created`
        } as IAudit)

        res.status(200).json({
            success: true,
            status: 'outcome',
            message: 'Outcome has been successfully created',
            outcome
        })
    })

    update = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const org_id = req.employee.employee_info.org_id
        const emp_id = req.employee.employee_info.id
        const { doc_id, payment_type, sum } = req.body

        const outcome = await storage.outcome.update({ org_id, _id: req.params.id }, {
            emp_id,
            doc_id,
            payment_type,
            sum
        } as IOutcome)

        await storage.audit.create({
            org_id,
            action: 'update',
            events: `${outcome.id} successfully updated`
        } as IAudit)

        res.status(200).json({
            success: true,
            status: 'outcome',
            message: 'Outcome has been successfully updated',
            outcome
        })
    })

    delete = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const org_id = req.employee.employee_info.org_id
        const ids = req.body

        ids.forEach(async (_id: string) => {
            await storage.outcome.delete({ org_id, _id })
        })

        const outcomes = await storage.outcome.find({ org_id })

        res.status(200).json({
            success: true,
            status: 'outcome',
            message: 'Outcomes have been successfully deleted',
            outcomes
        })
    })

    getAll = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const org_id = req.employee.employee_info.org_id

        const outcomes = await storage.outcome.find({ org_id })

        res.status(200).json({
            success: true,
            status: 'outcome',
            message: 'All outcomes',
            outcomes
        })
    })

    getOne = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const org_id = req.employee.employee_info.org_id

        const outcome = await storage.outcome.findOne({ org_id, _id: req.params.id })

        res.status(200).json({
            success: true,
            status: 'outcome',
            message: 'One Outcome',
            outcome
        })
    })
}
