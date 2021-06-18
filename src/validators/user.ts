import Joi from 'joi'
import { NextFunction, Request, Response } from 'express'
import catchAsync from '../utils/catchAsync'

export class UserRegLogValidator {
    keys = {
        required: 'required',
        optional: 'optional'
    }

    registerSchema = Joi.object({
        firstName: Joi.string().required().error(Error('Username is incorrect!')),
        phone_number: Joi.string().required().error(Error('Phone number is incorrect!')),
        organization: Joi.object().required().error(Error('Company name is incorrect!')),
        code: Joi.string().error(Error('Code is incorrect!'))
    })

    loginSchema = Joi.object({
        phone_number: Joi.string().required().error(Error('Phone Number is required')),
        code: Joi.string().error(Error('Code is incorrect'))
    })

    register = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { error } = this.registerSchema.validate(req.body)
        if (error) return next(error)

        next()
    })

    login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { error } = this.loginSchema.validate(req.body)
        if (error) return next(error)

        next()
    })

    // update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    //     const { error } = this.updateSchema.validate(req.body)
    //     if (error) return next(error)

    //     next()
    // })
}
