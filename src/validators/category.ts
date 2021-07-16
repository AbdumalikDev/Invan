import Joi from 'joi'
import { NextFunction, Request, Response } from 'express'
import catchAsync from '../utils/catchAsync'

export class CategoryValidator {
    keys = {
        required: 'required',
        optional: 'optional'
    }
    CategorySchema = Joi.object({
        name: Joi.string().required(),
        sub_categories: Joi.string()
    })

    category = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { error } = this.CategorySchema.validate(req.body)
        if (error) return next(error)

        next()
    })
}
