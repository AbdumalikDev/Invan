import { NextFunction, Request, Response } from 'express'
import { storage } from '../storage/main'
import catchAsync from '../utils/catchAsync'
import smsSend from './smsSend'
import AppError from '../utils/appError'
import { signToken } from './auth'
import moment from 'moment'



export class EmployeeController {
    login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

        if (!req.body.code) {
            const code: number = Math.floor(100000 + Math.random() * 900000)
            const phone_number: number = Number(req.body.phone_number)

            let findUser = await storage.employee.userExist({ phone_number })

            if (!findUser) return next(new AppError(404, 'User is not found', 'phone'))

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
            const smsAuth = await storage.smsAuth.findOne({ phone_number })

            if (smsAuth) {
                res.status(200).json({
                    success: true,
                    status: 'sms',
                    message: 'SMS code already sent',
                    time: moment(await smsAuth.createdAt)
                        .add(3, 'm')
                        .toDate()
                        .getTime()
                })
                return
            }

            const userAttempt = await storage.attempt.findOne({ phone_number })

            await smsSend(phone_number, code, userAttempt, req, res, next)
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

            const user = await storage.employee.findOne({ phone_number })

            let oldUser = user.sessions.find(usersession => {
                return usersession.ip_address == session.ip_address && usersession.user_agent == session.user_agent
            })
            let token;
            if (user.sessions.length >= user.allow_sessions) {
                let user_id: string;
                user_id = oldUser ? oldUser._id : user.sessions[0]._id

                let userPullData = await storage.employee.update(
                    { phone_number },
                    {
                        $pull: { sessions: { _id: user_id } }
                    }
                )

                let newUser = await storage.employee.update(
                    { phone_number },
                    {
                        $push: { sessions: session }
                    }
                )
                token = await signToken(
                    user._id,
                    newUser?.sessions[newUser.sessions.length - 1]?._id as string
                )

                await storage.attempt.delete({ phone_number })
                await storage.smsAuth.delete({ phone_number })
                res.status(200).json({
                    success: true,
                    token,
                    status: 'user'
                })
            } else {
                if (oldUser) {
                    let oldUserDelete = await storage.employee.update({ phone_number }, {
                        $pull: { sessions: { _id: oldUser._id } }
                    })
                }

                let userUpdate = await storage.employee.update(
                    { phone_number },
                    {
                        $push: { sessions: session }
                    }
                )

                token = await signToken(
                    user._id,
                    userUpdate?.sessions[userUpdate.sessions.length - 1]?._id as string
                )

                await storage.attempt.delete({ phone_number })
                await storage.smsAuth.delete({ phone_number })
                res.status(200).json({
                    success: true,
                    token,
                    status: 'user'
                })
            }
        }
    })
}