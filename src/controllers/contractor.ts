import { Request, Response, NextFunction } from 'express'
import { IGetUserAuthInfoRequest } from './auth'
import { storage } from '../storage/main'
import catchAsync from '../utils/catchAsync'
import AppError from '../utils/appError'
import { IContractor } from '../models/Contractor'
import { IAudit } from '../models/Audit'

export class ContractorController {
    create = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const { name, address, phone_number, comment, email, group } = req.body
        const emp_id = req.employee.employee_info.id
        const org_id = req.employee.employee_info.org_id

        const contractor = await storage.contractor.create({
            name,
            address,
            phone_number,
            comment,
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
        const org_id = req.employee.employee_info.org_id
        const _id = req.params.id

        const contractor = await storage.contractor.update({ org_id, _id }, {
            ...req.body
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
        const ids = req.body

        await storage.contractor.deleteMany({ org_id, _id: { $in: ids } })

        await storage.audit.create({
            org_id,
            action: 'create',
            events: `${req.params.id} successfully created`
        } as IAudit)

        const contractors = await storage.contractor.find({ org_id })

        res.status(200).json({
            success: true,
            status: 'contractor',
            message: 'Contractor has been successfully deleted',
            contractors
        })
    })

    getAll = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const org_id = req.employee.employee_info.org_id

        const contracts = await storage.contractor.find({ org_id })

        res.status(200).json({
            success: true,
            status: 'contractor',
            message: 'All contracts',
            contracts
        })
    })

    getOne = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const org_id = req.employee.employee_info.org_id
        const _id = req.params.id

        const contract = await storage.contractor.findOne({ org_id, _id })

        res.status(200).json({
            success: true,
            status: 'contractor',
            message: 'All contracts',
            contract
        })
    })
}
