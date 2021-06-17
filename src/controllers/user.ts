import { NextFunction, Request, Response } from 'express'
import { storage } from '../storage/main'
import catchAsync from '../utils/catchAsync'
import { ISmsAuth } from '../models/SmsAuth'
import { IUser } from '../models/User'
import smsSend from './smsSend'
import AppError from '../utils/appError'
import { IAttempt } from '../models/Attempt'
import { IBan } from '../models/Ban'
import { signToken } from './auth'

export class UserController {
    register = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        if (!req.body.code) {
            const phone_number: number = Number(req.body.phone_number)
            const organization = req.body.organization
            const code: number = Math.floor(100000 + Math.random() * 900000)

            const userStatusPhone = await storage.user.userExist({ phone_number })
            if (userStatusPhone) {
                return next(new AppError(401, 'phone'))
            }

            const userStatusOrg = await storage.user.userExist({
                $match: { organizations: { $in: [organization] } }
            })

            if (userStatusOrg) {
                return next(new AppError(401, 'organization'))
            }

            const userBan = await storage.ban.findOne({ phone_number })

            if (userBan) {
                return next(
                    new AppError(401, `Banned Time ${await userBan.createdAt.getTime()} for 3min`)
                )
            }

            const userAttempt = await storage.attempt.findOne({ phone_number })

            if (!userAttempt) {
                const response = await smsSend(phone_number, code)

                if (response.status !== 200) {
                    return next(new AppError(response.status, 'sms'))
                }

                await storage.smsAuth.create({ phone_number, code } as ISmsAuth)
                await storage.attempt.create({ phone_number } as IAttempt)

                res.status(200).json({
                    success: true,
                    status: 'code'
                })
            } else {
                if (userAttempt.attempts === 3) {
                    await storage.ban.create({ phone_number } as IBan)

                    res.status(200).json({
                        success: true,
                        status: 'ban'
                    })
                } else {
                    const response = await smsSend(phone_number, code)

                    if (response.status !== 200) {
                        return next(new AppError(response.status, 'sms'))
                    }

                    await storage.smsAuth.create({ phone_number, code } as ISmsAuth)
                    await storage.attempt.update({ phone_number }, {
                        attempts: userAttempt.attempts + 1
                    } as IAttempt)

                    res.status(200).json({
                        success: true,
                        status: 'code'
                    })
                }
            }
        } else {
            const { name, organizations } = req.body
            const phone_number: number = Number(req.body.phone_number)
            const enteredCode: number = Number(req.body.code)

            const code = (await storage.smsAuth.findOne({ phone_number })).code

            if (code !== enteredCode) {
                throw new AppError(401, 'code')
            }

            const sessions = [
                {
                    user_agent: req.headers['user-agent'],
                    ip_address: req.headers['x-forwarded-for'] || req.socket.remoteAddress
                }
            ]

            const user = await storage.user.create({
                name,
                organizations,
                phone_number,
                sessions
            } as IUser)

            await storage.attempt.delete({ phone_number })

            const token = await signToken(user._id, user.sessions[0]._id)

            res.status(200).json({
                success: true,
                status: 'user',
                data: {
                    token
                }
            })
        }
    })

    login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const phone_number = await storage.user.findOne({ phone_number: req.body })
        res.status(200).json({
            success: true
        })
    })
}
