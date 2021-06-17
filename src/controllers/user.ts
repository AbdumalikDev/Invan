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
                organizations: {
                    $elemMatch: { name: organization.name }
                }
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

            const userSmsAuth = await storage.smsAuth.findOne({ phone_number })

            if (userSmsAuth) {
                return next(new AppError(401, 'sms'))
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
            const { firstName, organization } = req.body
            const phone_number: number = Number(req.body.phone_number)
            const enteredCode: number = Number(req.body.code)

            const code = await storage.smsAuth.findOne({ phone_number })

            if (!code) {
                return next(new AppError(404, 'user'))
            }

            if (code.code !== enteredCode) {
                throw new AppError(401, 'code')
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
                data: {
                    token
                }
            })
        }
    })

    login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        if(!req.body.code){
            const code: number = Math.floor(100000 + Math.random() * 900000)
            const phone_number: number = Number(req.body.phone_number)
            
            let findUser = await storage.user.userExist({phone_number})

            if(!findUser) return next(new AppError(404,'phone'))

            const userBan = await storage.ban.findOne({ phone_number })
            
            if (userBan) return next(new AppError(200,`You are banned`))
            const userAttempt = await storage.attempt.findOne({ phone_number })
            if (!userAttempt) {
                const response = await smsSend(phone_number, code)

                if (response.status !== 200) {
                    throw new AppError(response.status, 'SMS not sent')
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
                        throw new AppError(response.status, 'SMS not sent')
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
        }else{
            const phone_number: number = Number(req.body.phone_number)
            const enteredCode: number = Number(req.body.code)
            
            const code = (await storage.smsAuth.findOne({ phone_number })).code

            if (code !== enteredCode) {
                return next(new AppError(401, 'code'))
            }

            const session={
                    user_agent: req.headers['user-agent'] as string,
                    ip_address: req.headers['x-forwarded-for'] as string || req.socket.remoteAddress as string
            }

            const user = await storage.user.findOne({phone_number})
          
            if(user.sessions.length>=3){
                let userPullData = await storage.user.update({phone_number}, {
                    $pull:{sessions:{_id:user.sessions[0]._id}}
                })

                let newUser = await storage.user.update({phone_number},{
                    $push:{sessions:session}
                })
                const token = await signToken(user._id, newUser?.sessions[newUser.sessions.length-1]?._id as string)
                
                res.status(200).json({
                    success:true,
                    token 
                })
            }else{
                let userUpdate = await storage.user.update({phone_number},{
                    $push:{sessions:session}
                })

                const token = await signToken(user._id, userUpdate?._id as string)

                res.status(200).json({
                    succes:true,
                    token
                })
            }
        }
    })
}
