import { NextFunction, Request, Response } from 'express'
import config from '../config/config'
import AppError from '../utils/appError'

export class ErrorController {
    sendErrorDev = (err: AppError, req: Request, res: Response, next: NextFunction) => {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            status: err.errstatus
        })
    }

    sendErrorProd = (err: AppError, req: Request, res: Response, next: NextFunction) => {
        // A) Operational, trusted error: send message to client
        if (err.isOperational) {
            return res.status(err.statusCode).json({
                success: false,
                message: err.message,
                status: err.errstatus
            })
        }

        // B) Programming or other unknown error: don't leak error details
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
            status: err.message.split(' ')[0]
        })
    }

    hanle = (err: AppError, req: Request, res: Response, next: NextFunction) => {
        err.statusCode = err.statusCode || 500
        err.status = err.status || 'error'

        if (config.NodeEnv === 'development') {
            this.sendErrorDev(err, req, res, next)
        } else if (config.NodeEnv === 'production') {
            this.sendErrorProd(err, req, res, next)
        }
    }
}
