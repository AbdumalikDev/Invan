import { NextFunction, Request, Response } from 'express'
import { storage } from '../storage/main'
import catchAsync from '../utils/catchAsync'
import { IEmployee } from '../models/Employee'
import smsSend from './smsSend'
import AppError from '../utils/appError'
import { signToken } from './auth'
import moment from 'moment'
import { IOrganization } from '../models/Organization'
import { IGetUserAuthInfoRequest } from './auth'
import { IAudit } from '../models/Audit'

export class OrgController {
    create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        if (!req.body.code) {
            const phone_number: number = Number(req.body.phone_number)
            const org_name = req.body.org_name
            const code: number = Math.floor(100000 + Math.random() * 900000)

            const orgNameStatus = await storage.org.orgExist({ org_name })

            if (orgNameStatus) {
                return next(new AppError(409, 'Organization already exists', 'orgName'))
            }

            const orgPhoneStatus = await storage.org.orgExist({ phone_number })

            if (orgPhoneStatus) {
                return next(new AppError(409, 'Organization already exists', 'orgPhone'))
            }

            const userBan = await storage.ban.findOne({ phone_number })

            if (userBan) {
                return next(
                    new AppError(
                        403,
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
                return next(new AppError(404, 'Employee not found', 'emp'))
            }

            if (code.code !== enteredCode) {
                throw new AppError(403, 'SMS code is incorrect', 'sms')
            }

            const session = {
                user_agent: req.headers['user-agent'],
                ip_address: req.headers['x-forwarded-for'] || req.socket.remoteAddress
            }

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
                sessions: [session]
            } as IEmployee)

            employee = await storage.employee.update({ phone_number }, { owner_id: employee.id })

            await storage.audit.create({
                org_id: org.id,
                action: 'create',
                events: `${session.user_agent} ${session.ip_address} logged in`
            } as IAudit)

            await storage.attempt.delete({ phone_number })
            await storage.smsAuth.delete({ phone_number })
            const token = await signToken(employee._id, employee.sessions[0]._id)

            let employeeInfo = await storage.employee.findAndPopulate({ phone_number })

            res.status(201).json({
                success: true,
                status: 'emp',
                message: 'Employee Successfully Registered',
                token,
                data: employeeInfo
            })
        }
    })

    logout = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const {
            session_id,
            employee_info: { phone_number, _id, org_id }
        } = req.employee

        if (!session_id) return next(new AppError(404, 'Session not found', 'sesssion'))
        if (!phone_number) return next(new AppError(404, 'Phone number is not found', 'phone'))

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
}
