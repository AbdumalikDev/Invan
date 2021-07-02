import config from '../config/config'
import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import AppError from '../utils/appError'
import catchAsync from '../utils/catchAsync'
import { storage } from '../storage/main'
import { IEmployee } from '../models/Employee'

export interface newEmployee extends IEmployee {
    session_id: string
    employee_info: IEmployee
}
export interface IGetUserAuthInfoRequest extends Request {
    employee: newEmployee
}
type DecodedToken = {
    employee_id: string
    session_id: string
    iat: number
}

export const signToken = async (employee_id: string, session_id: string): Promise<String> => {
    return jwt.sign({ employee_id, session_id }, config.JwtSecret)
}

export const decodeToken = async (token: string): Promise<DecodedToken> => {
    const decoded = (await jwt.verify(token, config.JwtSecret)) as DecodedToken

    return decoded
}

export const AuthMiddleware = catchAsync(
    async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const token = req.headers.authorization

        if (!token) return next(new AppError(401, 'Token not found', 'token'))

        let { employee_id, session_id } = await decodeToken(token)

        let employee = await storage.employee.findOne({ _id: employee_id })

        if (!employee) return next(new AppError(404, 'User not found', 'user'))

        let employeeSession = employee.sessions.find((session) => {
            return session._id === session_id
        })

        if (!employeeSession) return next(new AppError(404, 'Session not found', 'session'))

        req.employee = {
            employee_info: employee,
            session_id: employeeSession._id
        } as newEmployee

        next()
    }
)
