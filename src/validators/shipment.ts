import Joi from 'joi'
import { NextFunction, Request, Response } from 'express'
import catchAsync from '../utils/catchAsync'

export class ShipmentValidator {
    keys = {
        required: 'required',
        optional: 'optional'
    }

    
    ShipmentSchema = Joi.object({
        item: Joi.string().required(),
        contractor_id: Joi.string().required(),
        doc_id: Joi.string().required(),
        doc_date: Joi.string().required(),
        is_checked: Joi.boolean(),
        warehouse_id: Joi.string().required(),
        org_id: Joi.string().required(),
        emp_id: Joi.string().required()
    })


    
    shipment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { error } = this.ShipmentSchema.validate(req.body)
        if (error) return next(error)

        next()
    })
}
