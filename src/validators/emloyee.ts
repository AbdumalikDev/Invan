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
            .error(new AppError(400, 'Phone number is incorrect!', 'phone number')),
        code: Joi.string().error(new AppError(400, 'Code is incorrect', 'code'))
    })

    employeeCreateSchema = Joi.object({
        first_name: Joi.string()
            .required()
            .error(new AppError(400, 'First name is incorrect!', 'first name')),
        last_name: Joi.string()
            .allow('')
            .error(new AppError(400, 'Last name is incorrect!', 'last name')),
        age: Joi.number()
            .allow('')
            .error(new AppError(400, 'Age is incorrect!', 'age'))
            .min(10)
            .max(100),
        gender: Joi.string().allow('').error(new AppError(400, 'Gender is incorrect!', 'gender')),
        phone_number: Joi.string()
            .required()
            .pattern(/^998(9[012345789]|6[125679]|7[01234569])[0-9]{7}$/)
            .error(new AppError(400, 'Phone number is incorrect!', 'phone')),
        allow_sessions: Joi.string()
            .allow('')
            .error(new AppError(400, 'Allow sessions is incorrect!', 'allow sessions')),
        email: Joi.string().allow('').error(new AppError(400, 'Email is incorrect!', 'email')),
        file: Joi.object().allow('').error(new AppError(400, 'Uploaded File is incorrect!', 'file'))
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
        const { error } = this.employeeCreateSchema.validate(req.body)
        if (error) return next(error)
        next()
    })
}
