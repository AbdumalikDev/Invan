import Joi from 'joi'
import { NextFunction, Request, Response } from 'express'
import catchAsync from '../utils/catchAsync'

export class ContractorValidator {
    keys = {
        required: 'required',
        optional: 'optional'
    }
    ContractorSchema = Joi.object({
        name: Joi.string().required(),
        address: Joi.string(),
        phone_number: Joi.string(),
        contrat: Joi.string(),
        email: Joi.string(),
        group: Joi.string(),
        org_id: Joi.string().required(),
        emp_id: Joi.string().required()
    })

    contractor = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { error } = this.ContractorSchema.validate(req.body)
        if (error) return next(error)

        next()
    })
}
