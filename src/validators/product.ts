import Joi, { string } from 'joi'
import { NextFunction, Request, Response } from 'express'
import catchAsync from '../utils/catchAsync'

export class ProductValidator {
    keys = {
        required: 'required',
        optional: 'optional'
    }

    productSchema = Joi.object({
        org_id: Joi.string().required(),
        owner_id: Joi.string().required(),
        name: Joi.string().required(),
        description: Joi.string(),
        barcode: Joi.string().required(),
        sku: Joi.string(),
        Image: Joi.string(),
        //unit:Unit[],
        //grout:Group[],
        vender_code: Joi.string(),
        weight: Joi.string(),
        volume: Joi.string(),
        VAT: Joi.string(),
        is_shared: Joi.boolean(),
        update_history: Joi.string()
    })

    updateSchema = Joi.object({
        org_id: Joi.string().required(),
        owner_id: Joi.string().required(),
        name: Joi.string().required(),
        description: Joi.string(),
        barcode: Joi.string().required(),
        sku: Joi.string(),
        Image: Joi.string(),
        //unit:Unit[],
        //grout:Group[],
        vender_code: Joi.string(),
        weight: Joi.string(),
        volume: Joi.string(),
        VAT: Joi.string(),
        is_shared: Joi.boolean(),
        update_history: Joi.string()
    })

    create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { error } = this.productSchema.validate(req.body)
        if (error) return next(error)

        next()
    })

    update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { error } = this.updateSchema.validate(req.body)
        if (error) return next(error)

        next()
    })
}
