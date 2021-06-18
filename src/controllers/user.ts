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
import moment from 'moment'

export class UserController {
    register = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        if (!req.body.code) {
            console.log(req.body)
            const phone_number: number = Number(req.body.phone_number)
            const organization = req.body.organization
            const code: number = Math.floor(100000 + Math.random() * 900000)

            const userStatusPhone = await storage.user.userExist({ phone_number })
            if (userStatusPhone) {
                return next(new AppError(401, 'Phone number already exists', 'phone'))
            }
            const userStatusOrg = await storage.user.userExist({
                organizations: {
                    $elemMatch: { name: organization.name }
                }
            })

            if (userStatusOrg) {
                return next(new AppError(401, 'Organization already exists', 'organization'))
            }

            const userBan = await storage.ban.findOne({ phone_number })

            if (userBan) {
                return next(
                    new AppError(
                        401,
                        `You are banned till ${moment(await userBan.createdAt)
                            .add(3, 'm')
                            .toDate()
                            .toLocaleTimeString('en-US', { hour12: false })}`,
                        'ban'
                    )
                )
            }

            const smsAuth = await storage.smsAuth.findOne({ phone_number })

            if (smsAuth) {
                res.status(200).json({
                    success: true,
                    status: 'sms',
                    message: 'SMS code sent',
                    time: moment(await smsAuth.createdAt)
                        .add(3, 'm')
                        .toDate()
                        .getTime()
                })
            }

            const userAttempt = await storage.attempt.findOne({ phone_number })

            await smsSend(phone_number,code,userAttempt,req,res,next)
        } else {
            const { firstName, organization } = req.body
            const phone_number: number = Number(req.body.phone_number)
            const enteredCode: number = Number(req.body.code)

            const code = await storage.smsAuth.findOne({ phone_number })

            if (!code) {
                return next(new AppError(404, 'User not found', 'user'))
            }

            if (code.code !== enteredCode) {
                throw new AppError(401, 'SMS code is incorrect', 'sms')
            }

            const sessions = [
                {
                    user_agent: req.headers['user-agent'],
                    ip_address: req.headers['x-forwarded-for'] || req.socket.remoteAddress
                }
            ]

            const user = await storage.user.create({
                name: {
                    firstName,
                    lastName: ''
                },
                organizations: [organization],
                phone_number,
                sessions
            } as IUser)

            await storage.attempt.delete({ phone_number })

            const token = await signToken(user._id, user.sessions[0]._id)

            res.status(200).json({
                success: true,
                status: 'user',
                message: 'User Successfully Registered',
                data: {
                    token
                }
            })
        }
    })

    login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        if (!req.body.code) {
            const code: number = Math.floor(100000 + Math.random() * 900000)
            const phone_number: number = Number(req.body.phone_number)

            let findUser = await storage.user.userExist({ phone_number })

            if (!findUser) return next(new AppError(404, 'Phone number already exists', 'phone'))

            const userBan = await storage.ban.findOne({ phone_number })

            if (userBan) {
                return next(
                    new AppError(
                        401,
                        `You are banned till ${moment(
                            await userBan.createdAt.toLocaleTimeString('en-US', {
                                hour12: false
                            })
                        ).add(3, 'm')}`,
                        'ban'
                    )
                )
            }

            const userAttempt = await storage.attempt.findOne({ phone_number })

            await smsSend(phone_number,code,userAttempt,req,res,next)
            
        } else {
            const phone_number: number = Number(req.body.phone_number)
            const enteredCode: number = Number(req.body.code)

            const code = await storage.smsAuth.findOne({ phone_number })

            if (!code) {
                return next(new AppError(401, 'SMS code already sent', 'sms'))
            }

            if (code.code !== enteredCode) {
                return next(new AppError(401, 'SMS code is incorrect', 'sms'))
            }

            const session = {
                user_agent: req.headers['user-agent'] as string,
                ip_address:
                    (req.headers['x-forwarded-for'] as string) ||
                    (req.socket.remoteAddress as string)
            }

            const user = await storage.user.findOne({ phone_number })

            if (user.sessions.length >= 3) {
                let userPullData = await storage.user.update(
                    { phone_number },
                    {
                        $pull: { sessions: { _id: user.sessions[0]._id } }
                    }
                )

                let newUser = await storage.user.update(
                    { phone_number },
                    {
                        $push: { sessions: session }
                    }
                )
                const token = await signToken(
                    user._id,
                    newUser?.sessions[newUser.sessions.length - 1]?._id as string
                )

                res.status(200).json({
                    success: true,
                    token
                })
            } else {
                let userUpdate = await storage.user.update(
                    { phone_number },
                    {
                        $push: { sessions: session }
                    }
                )

                const token = await signToken(user._id, userUpdate?._id as string)

                res.status(200).json({
                    succes: true,
                    token
                })
            }
        }
    })
}
