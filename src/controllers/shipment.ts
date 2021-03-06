import { Response, NextFunction } from 'express'
import { IGetUserAuthInfoRequest } from './auth'
import { IShipment } from '../models/Shipment'
import { storage } from '../storage/main'
import catchAsync from '../utils/catchAsync'
import { IAudit } from '../models/Audit'

export class ShipmentController {
    create = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const { item, contractor_id, doc_id, doc_date, is_checked, warehouse_id } = req.body
        const { id: emp_id, org_id } = req.employee.employee_info

        const shipment = await storage.shipment.create({
            item,
            contractor_id,
            doc_id,
            doc_date,
            is_checked,
            warehouse_id,
            org_id,
            emp_id
        } as IShipment)

        await storage.audit.create({
            org_id,
            action: 'create',
            events: `${shipment.id} successfully created`
        } as IAudit)

        res.status(200).json({
            success: true,
            status: 'shipment',
            message: 'Shipment has been successfully created',
            shipment
        })
    })

    update = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const { item, contractor_id, doc_id, doc_date, is_checked, warehouse_id } = req.body
        const { org_id, id: emp_id } = req.employee.employee_info

        const shipment = await storage.shipment.update({ org_id, id: req.params.id }, {
            item,
            contractor_id,
            doc_id,
            doc_date,
            is_checked,
            warehouse_id,
            org_id,
            emp_id
        } as IShipment)

        await storage.audit.create({
            org_id,
            action: 'update',
            events: `${shipment.id} successfully updated`
        } as IAudit)

        res.status(200).json({
            success: true,
            status: 'shipment',
            message: 'Shipment has been successfully updated',
            shipment
        })
    })

    delete = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const org_id = req.employee.employee_info.org_id

        await storage.shipment.deleteMany({ org_id, id: req.params.id })

        await storage.audit.create({
            org_id,
            action: 'create',
            events: `${req.params.id} successfully created`
        } as IAudit)

        res.status(200).json({
            success: true,
            status: 'shipment',
            message: 'Shipment has been successfully deleted'
        })
    })

    getAll = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const org_id = req.employee.employee_info.org_id

        const shipments = await storage.shipment.find({ org_id })

        res.status(200).json({
            success: true,
            status: 'shipment',
            message: 'All shipments',
            shipments
        })
    })

    getOne = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const org_id = req.employee.employee_info.org_id
        const _id = req.params.id

        const shipment = await storage.shipment.findOne({ org_id })
    })
}
