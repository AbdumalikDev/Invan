import Joi from 'joi'
import { NextFunction, Request, Response } from 'express'
import catchAsync from '../utils/catchAsync'

export class ItemValidator {
    keys = {
        required: 'required',
        optional: 'optional'
    }
    ItemSchema = Joi.object({
        product_id: Joi.string().required(),
        cost: Joi.number().required(),
        quantity: Joi.number().required(),
        org_id: Joi.string().required(),
        emp_id: Joi.string().required()
    })

    item = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { error } = this.ItemSchema.validate(req.body)
        if (error) return next(error)

        next()
    })
}
