import Joi from 'joi'
import { NextFunction, Request, Response } from 'express'
import catchAsync from '../utils/catchAsync'

export class OutcomeValidator {
    keys = {
        required: 'required',
        optional: 'optional'
    }

    OutcomeSchema = Joi.object({
        payment_type: Joi.string().required(),
        sum: Joi.number().required(),
        org_id: Joi.string().required(),
        emp_id: Joi.string().required()
    })

    outcome = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { error } = this.OutcomeSchema.validate(req.body)
        if (error) return next(error)

        next()
    })
}
