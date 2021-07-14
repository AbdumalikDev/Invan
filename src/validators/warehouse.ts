import Joi from 'joi'
import { NextFunction, Request, Response } from 'express'
import catchAsync from '../utils/catchAsync'

export class WarehouseValidator {
    keys = {
        required: 'required',
        optional: 'optional'
    }
    WarehouseSchema = Joi.object({
        name: Joi.string().required(),
        org_id: Joi.string().required(),
        emp_id: Joi.string().required()
    })

    warehouse = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { error } = this.WarehouseSchema.validate(req.body)
        if (error) return next(error)

        next()
    })
}
