import { NextFunction, Request, Response } from 'express'
import { storage } from '../storage/main'
import catchAsync from '../utils/catchAsync'
import { IEmployee } from '../models/Employee'
import smsSend from './smsSend'
import AppError from '../utils/appError'
import { signToken } from './auth'
import moment from 'moment'
import { IGetUserAuthInfoRequest } from './auth'
import { IOrganization } from '../models/Organization'

export class OrgController {
    create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        if (!req.body.code) {
            const phone_number: number = Number(req.body.phone_number)
            const org_name = req.body.org_name
            const code: number = Math.floor(100000 + Math.random() * 900000)

            const orgStatus = await storage.org.orgExist({ org_name })

            if (orgStatus) {
                return next(new AppError(401, 'User already exists', 'org'))
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
                    message: 'SMS code already sent',
                    time: moment(await smsAuth.createdAt)
                        .add(3, 'm')
                        .toDate()
                        .getTime()
                })
            }

            const userAttempt = await storage.attempt.findOne({ phone_number })

            await smsSend(phone_number, code, userAttempt, req, res, next)
        } else {
            const { first_name, org_name } = req.body
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

            const org = await storage.org.create({
                org_name,
                phone_number
            } as IOrganization)

            let employee = await storage.employee.create({
                org_id: org._id,
                name: {
                    first_name
                },
                phone_number,
                status: 'super_admin',
                state: 'active',
                sessions
            } as IEmployee)

            employee = await storage.employee.update({ phone_number }, { owner_id: employee.id })

            await storage.attempt.delete({ phone_number })

            const token = await signToken(employee._id, employee.sessions[0]._id)

            res.status(200).json({
                success: true,
                status: 'user',
                message: 'User Successfully Registered',
                data: {
                    token,
                    org,
                    employee
                }
            })
        }
    })

    // login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    //     if (!req.body.code) {
    //         const code: number = Math.floor(100000 + Math.random() * 900000)
    //         const phone_number: number = Number(req.body.phone_number)

    //         let findUser = await storage.user.userExist({ phone_number })

    //         if (!findUser) return next(new AppError(404, 'User is not found', 'phone'))

    //         const userBan = await storage.ban.findOne({ phone_number })

    //         if (userBan) {
    //             return next(
    //                 new AppError(
    //                     401,
    //                     `You are banned till ${moment(
    //                         await userBan.createdAt.toLocaleTimeString('en-US', {
    //                             hour12: false
    //                         })
    //                     ).add(3, 'm')}`,
    //                     'ban'
    //                 )
    //             )
    //         }
    //         const smsAuth = await storage.smsAuth.findOne({ phone_number })

    //         if (smsAuth) {
    //             res.status(200).json({
    //                 success: true,
    //                 status: 'sms',
    //                 message: 'SMS code already sent',
    //                 time: moment(await smsAuth.createdAt)
    //                     .add(3, 'm')
    //                     .toDate()
    //                     .getTime()
    //             })
    //             return
    //         }

    //         const userAttempt = await storage.attempt.findOne({ phone_number })

    //         await smsSend(phone_number, code, userAttempt, req, res, next)
    //     } else {
    //         const phone_number: number = Number(req.body.phone_number)
    //         const enteredCode: number = Number(req.body.code)

    //         const code = await storage.smsAuth.findOne({ phone_number })

    //         if (!code) {
    //             return next(new AppError(401, 'SMS code already sent', 'sms'))
    //         }

    //         if (code.code !== enteredCode) {
    //             return next(new AppError(401, 'SMS code is incorrect', 'sms'))
    //         }

    //         const session = {
    //             user_agent: req.headers['user-agent'] as string,
    //             ip_address:
    //                 (req.headers['x-forwarded-for'] as string) ||
    //                 (req.socket.remoteAddress as string)
    //         }

    //         const user = await storage.user.findOne({ phone_number })

    //         if (user.sessions.length >= 3) {
    //             let userPullData = await storage.user.update(
    //                 { phone_number },
    //                 {
    //                     $pull: { sessions: { _id: user.sessions[0]._id } }
    //                 }
    //             )

    //             let newUser = await storage.user.update(
    //                 { phone_number },
    //                 {
    //                     $push: { sessions: session }
    //                 }
    //             )
    //             const token = await signToken(
    //                 user._id,
    //                 newUser?.sessions[newUser.sessions.length - 1]?._id as string
    //             )

    //             await storage.attempt.delete({ phone_number })
    //             await storage.smsAuth.delete({ phone_number })
    //             res.status(200).json({
    //                 success: true,
    //                 token,
    //                 status: 'user'
    //             })
    //         } else {
    //             let userUpdate = await storage.user.update(
    //                 { phone_number },
    //                 {
    //                     $push: { sessions: session }
    //                 }
    //             )

    //             const token = await signToken(
    //                 user._id,
    //                 userUpdate?.sessions[userUpdate.sessions.length - 1]?._id as string
    //             )

    //             await storage.attempt.delete({ phone_number })
    //             await storage.smsAuth.delete({ phone_number })
    //             res.status(200).json({
    //                 success: true,
    //                 token,
    //                 status: 'user'
    //             })
    //         }
    //     }
    // })

    // admin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    //     res.status(200).json({
    //         success: true
    //     })
    // })

    logout = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const {
            session_id,
            employee_info: { phone_number }
        } = req.employee

        if (!session_id) return next(new AppError(401, 'Session not found', 'sesssion'))
        if (!phone_number) return next(new AppError(401, 'Phone number is not found', 'phone'))

        let userPullData = await storage.employee.update(
            { phone_number },
            {
                $pull: { sessions: { _id: session_id } }
            }
        )

        if (!userPullData) return next(new AppError(400, 'Cannot delete session', 'session'))

        res.status(200).json({
            success: true
        })
    })

    // audit = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    //     const {
    //         userInfo: { sessions }
    //     } = req.user

    //     if (!sessions) return next(new AppError(401, 'Sessions are not found', 'sessions'))

    //     res.status(200).json({
    //         success: true,
    //         sessions
    //     })
    // })

    // deleteaudit = catchAsync(
    //     async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    //         const {
    //             session_id,
    //             userInfo: { phone_number }
    //         } = req.user

    //         if (!session_id) return next(new AppError(401, 'User Session id  not found', 'session'))
    //         if (!req.body.id)
    //             return next(new AppError(401, 'Device Session id not found', 'device'))

    //         if (session_id == req.body.id)
    //             return next(new AppError(405, 'You can not revoke yourself', 'yourself'))

    //         let deleteSession = await storage.user.update(
    //             { phone_number },
    //             {
    //                 $pull: { sessions: { _id: req.body.id } }
    //             }
    //         )
    //         console.log(req.body.id)
    //         console.log(deleteSession)
    //         if (!deleteSession) return next(new AppError(400, 'Something wrong!', 'wrong'))
    //     }
    // )
}
