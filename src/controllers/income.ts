import { Request, Response, NextFunction } from 'express'
import { IGetUserAuthInfoRequest } from './auth'
import { storage } from '../storage/main'
import catchAsync from '../utils/catchAsync'
import { IIncome } from '../models/Income'
import { IAudit } from '../models/Audit'

export class IncomeController {
    create = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const { doc_id, payment_type, sum } = req.body
        const emp_id = req.employee.employee_info.id
        const org_id = req.employee.employee_info.org_id

        const income = await storage.income.create({
            doc_id,
            payment_type,
            sum,
            org_id,
            emp_id
        } as IIncome)

        await storage.audit.create({
            org_id,
            action: 'create',
            events: `${income.id} successfully created`
        } as IAudit)

        res.status(200).json({
            success: true,
            status: 'income',
            message: 'Income has been successfully created',
            income
        })
    })

    update = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const { doc_id, payment_type, sum } = req.body
        const org_id = req.employee.employee_info.org_id
        const emp_id = req.employee.employee_info.id

        const income = await storage.income.update({ org_id, id: req.params.id }, {
            doc_id,
            payment_type,
            sum,
            org_id,
            emp_id
        } as IIncome)

        await storage.audit.create({
            org_id,
            action: 'update',
            events: `${income.id} successfully updated`
        } as IAudit)

        res.status(200).json({
            success: true,
            status: 'income',
            message: 'Income has been successfully updated',
            income
        })
    })

    delete = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const org_id = req.employee.employee_info.org_id

        const ids = req.body

        ids.forEach(async (_id: string) => {
            await storage.income.delete({ org_id, _id })
        })

        await storage.audit.create({
            org_id,
            action: 'create',
            events: `${req.params.id} successfully created`
        } as IAudit)

        const incomes = await storage.income.find({ org_id })

        res.status(200).json({
            success: true,
            status: 'income',
            message: 'Income has been successfully deleted',
            incomes
        })
    })

    getAll = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const org_id = req.employee.employee_info.org_id

        let incomes = await storage.income.find({ org_id })

        res.status(200).json({
            success: true,
            status: 'income',
            message: 'All incomes',
            incomes
        })
    })
}
