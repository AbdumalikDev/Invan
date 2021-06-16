import Joi from "joi"
import { NextFunction, Request, Response } from "express"
import catchAsync from "../utils/catchAsync"

export class UserRegLogValidator {
    keys = {
        required: "required",
        optional: "optional"
    }

    createSchema = Joi.object({
        name: Joi.string().error(Error("Username is incorrect!")),
        phone_number: Joi.number().error(Error("Phone number is incorrect!")),
        organization: Joi.string().error(Error("Company name is incorrect!")),
        status: Joi.number().error(Error("Status is incorrect!")),
        code: Joi.number().error(Error("Code is incorrect!"))
    })

    updateSchema = Joi.object({
        phone_number: Joi.string().required()
    })

    create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { error } = this.createSchema.validate(req.body)
        if (error) return next(error)

        next()
    })

    update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { error } = this.updateSchema.validate(req.body)
        if (error) return next(error)

        next()
    })
}
