import Joi from 'joi'
import { NextFunction, Request, Response } from 'express'
import catchAsync from '../utils/catchAsync'

export class GroupValidator {
    keys = {
        required: 'required',
        optional: 'optional'
    }
    GroupSchema = Joi.object({
        name: Joi.string().required(),
    })

    group = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { error } = this.GroupSchema.validate(req.body)
        if (error) return next(error)

        next()
    })
}
