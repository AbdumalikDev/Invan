import { Request, Response, NextFunction } from 'express'
import { IGetUserAuthInfoRequest } from './auth'
import { storage } from '../storage/main'
import catchAsync from '../utils/catchAsync'
import AppError from '../utils/appError'
import { IContractor } from '../models/Contractor'
import { IAudit } from '../models/Audit'

export class ContractorController {
    create = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const { name, address, phone_number, contract, email, group } = req.body
        const emp_id = req.employee.employee_info.id
        const org_id = req.employee.employee_info.org_id

        const contractor = await storage.contractor.create({
            name,
            address,
            phone_number,
            contract,
            email,
            group,
            org_id,
            emp_id
        } as IContractor)

        await storage.audit.create({
            org_id,
            action: 'create',
            events: `${contractor.id} successfully created`
        } as IAudit)

        res.status(200).json({
            success: true,
            status: 'contractor',
            message: 'Contractor has been successfully created',
            contractor
        })
    })

    update = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const { name, address, phone_number, contract, email, group } = req.body
        const org_id = req.employee.employee_info.org_id
        const emp_id = req.employee.employee_info.id

        const contractor = await storage.contractor.update({ org_id, id: req.params.id }, {
            name,
            address,
            phone_number,
            contract,
            email,
            group,
            org_id,
            emp_id
        } as IContractor)

        await storage.audit.create({
            org_id,
            action: 'update',
            events: `${contractor.id} successfully updated`
        } as IAudit)

        res.status(200).json({
            success: true,
            status: 'contractor',
            message: 'Contractor has been successfully updated',
            contractor
        })
    })

    delete = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const org_id = req.employee.employee_info.org_id

        await storage.contractor.delete({ org_id, id: req.params.id })

        await storage.audit.create({
            org_id,
            action: 'create',
            events: `${req.params.id} successfully created`
        } as IAudit)

        res.status(200).json({
            success: true,
            status: 'contractor',
            message: 'Contractor has been successfully deleted'
        })
    })

    getAll = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const org_id = req.employee.employee_info.org_id

        let contracts = await storage.contractor.find({ org_id })

        res.status(200).json({
            success: true,
            status: 'contractor',
            message: 'All contracts',
            contracts
        })
    })
}
