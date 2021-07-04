import Joi from 'joi'
import { NextFunction, Request, Response } from 'express'
import catchAsync from '../utils/catchAsync'
import AppError from '../utils/appError'

export class UserValidator {
    keys = {
        required: 'required',
        optional: 'optional'
    }

    registerSchema = Joi.object({
        org_name: Joi.string().required().error(Error('Organization name is incorrect!')),
        phone_number: Joi.string()
            .required()
            .pattern(/^998(9[012345789]|6[125679]|7[01234569])[0-9]{7}$/)
            .error(Error('Phone number is incorrect!')),
        first_name: Joi.string().required().error(Error('First name is incorrect!')),
        code: Joi.string().error(Error('Code is incorrect!'))
    })

    loginSchema = Joi.object({
        phone_number: Joi.string()
            .required()
            .pattern(/^998(9[012345789]|6[125679]|7[01234569])[0-9]{7}$/)
            .error(Error('Phone number is incorrect!')),
        code: Joi.string().error(Error('Code is incorrect'))
    })

    employeeCreateSchema = Joi.object({
        first_name: Joi.string().required().error(Error('First name is required')),
        last_name: Joi.string().allow('').error(Error('Last name is incorrect!')),
        age: Joi.string().allow('').error(Error('Age is incorrect!')).min(10).max(100),
        gender: Joi.string().allow('').error(Error('Gender is incorrect!')),
        phone_number: Joi.string()
            .required()
            .pattern(/^998(9[012345789]|6[125679]|7[01234569])[0-9]{7}$/)
            .error(Error('Phone number is incorrect!')),
        allow_sessions: Joi.string().allow('').error(Error('Allow sessions is incorrect!')),
        email: Joi.string().email().allow('').error(Error('Email is incorrect!')),
        file: Joi.object().allow('').error(Error('Email is incorrect!'))
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

    employeCreate = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        console.log('1')
        console.log(req.body)
        const { error } = this.employeeCreateSchema.validate(req.body)
        if (error) return next(error)
        next()
    })
}
