import Joi from 'joi'
import { NextFunction, Request, Response } from 'express'
import catchAsync from '../utils/catchAsync'

export class IncomeValidator {
    keys = {
        required: 'required',
        optional: 'optional'
    }
    IncomeSchema = Joi.object({
        doc_id: Joi.string().required(),
        payment_type: Joi.string().required(),
        sum: Joi.number().required(),
        org_id: Joi.string().required(),
        emp_id: Joi.string().required()
    })

    income = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { error } = this.IncomeSchema.validate(req.body)
        if (error) return next(error)

        next()
    })
}
