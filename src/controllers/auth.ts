import config from '../config/config'
import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import AppError from '../utils/appError'
import catchAsync from '../utils/catchAsync'
import { storage } from '../storage/main'
import { IUser } from '../models/User'

export interface newUser extends IUser {
    session_id: string
    userInfo: IUser
}
export interface IGetUserAuthInfoRequest extends Request {
    user: newUser
}
type DecodedToken = {
    user_id: string
    session_id: string
    iat: number
}

export const signToken = async (user_id: string, session_id: string): Promise<String> => {
    return jwt.sign({ user_id, session_id }, config.JwtSecret)
}

export const decodeToken = async (token: string): Promise<DecodedToken> => {
    const decoded = (await jwt.verify(token, config.JwtSecret)) as DecodedToken

    return decoded
}

export const AuthMiddleware = catchAsync(
    async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const token = req.headers.authorization

        if (!token) return next(new AppError(401, 'Token not found', 'token'))

        let { user_id, session_id } = await decodeToken(token)

        let user = await storage.user.findOne({ _id: user_id })

        if (!user) return next(new AppError(404, 'User not found', 'user'))

        let userSession = user.sessions.find((session) => {
            return session._id === session_id
        })

        if (!userSession) return next(new AppError(404, 'Session not found', 'session'))

        req.user = {
            userInfo: user,
            session_id: userSession._id
        } as newUser
        next()
    }
)
