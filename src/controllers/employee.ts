import { NextFunction, Request, Response } from 'express'
import { storage } from '../storage/main'
import catchAsync from '../utils/catchAsync'
import smsSend, { sendMessage } from './smsSend'
import AppError from '../utils/appError'
import { IEmployee } from '../models/Employee'
import { IOrganization } from '../models/Organization'
import { signToken, IGetUserAuthInfoRequest, decodeToken } from './auth'
import moment from 'moment'
import path from 'path'
import fsPromise from 'fs/promises'
import fsSync from 'fs'
import { v4 as uuidv4 } from 'uuid'
import { IAudit } from '../models/Audit'

export class EmployeeController {
    login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        if (!req.body.code) {
            const code: number = Math.floor(100000 + Math.random() * 900000)
            const phone_number: number = Number(req.body.phone_number)

            let findEmployee = await storage.employee.userExist({ phone_number })

            if (!findEmployee) return next(new AppError(404, 'Employee not found', 'emp'))

            let statusOfEmployee = await storage.employee.findOne({ phone_number })

            if (statusOfEmployee.state != 'active')
                return next(new AppError(400, 'Your account is not active', 'account'))

            const userBan = await storage.ban.findOne({ phone_number })

            if (userBan) {
                return next(
                    new AppError(
                        403,
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
                return res.status(200).json({
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
            const phone_number: number = Number(req.body.phone_number)
            const enteredCode: number = Number(req.body.code)
            let employee = await storage.employee.findOne({ phone_number })

            const code = await storage.smsAuth.findOne({ phone_number })

            if (!code) {
                return next(new AppError(409, 'SMS code not found!', 'sms'))
            }

            if (code.code !== enteredCode) {
                return next(new AppError(403, 'SMS code is incorrect', 'sms'))
            }
            if (employee.state != 'active') {
                return next(new AppError(400, 'Your account is not active', 'account'))
            }

            const session = {
                user_agent: req.headers['user-agent'] as string,
                ip_address:
                    (req.headers['x-forwarded-for'] as string) ||
                    (req.socket.remoteAddress as string)
            }

            let oldEmployeeSession = employee.sessions.find((usersession) => {
                return (
                    usersession.ip_address == session.ip_address &&
                    usersession.user_agent == session.user_agent
                )
            })

            let token

            if (employee.sessions.length >= employee.allow_sessions) {
                let user_id: string
                user_id = oldEmployeeSession ? oldEmployeeSession._id : employee.sessions[0]._id

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
                    employee._id,
                    newUser?.sessions[newUser.sessions.length - 1]?._id as string
                )

                await storage.attempt.delete({ phone_number })
                await storage.smsAuth.delete({ phone_number })

                employee = await storage.employee.findAndPopulate({ phone_number })

                let employeeOrg = employee.org_id as IOrganization

                await storage.audit.create({
                    org_id: employeeOrg._id,
                    action: 'create',
                    events: `${session.user_agent} ${session.ip_address} logged in`
                } as IAudit)

                res.status(200).json({
                    success: true,
                    status: 'emp',
                    token,
                    data: employee
                })
            } else {
                if (oldEmployeeSession) {
                    let oldUserDelete = await storage.employee.update(
                        { phone_number },
                        {
                            $pull: { sessions: { _id: oldEmployeeSession._id } }
                        }
                    )
                }

                let userUpdate = await storage.employee.update(
                    { phone_number },
                    {
                        $push: { sessions: session }
                    }
                )

                token = await signToken(
                    employee._id,
                    userUpdate?.sessions[userUpdate.sessions.length - 1]?._id as string
                )

                await storage.attempt.delete({ phone_number })

                await storage.smsAuth.delete({ phone_number })

                employee = await storage.employee.findAndPopulate({ phone_number })

                let employeeOrg = employee.org_id as IOrganization

                await storage.audit.create({
                    org_id: employeeOrg._id,
                    action: 'create',
                    events: `${session.user_agent} ${session.ip_address} logged in`
                } as IAudit)

                res.status(200).json({
                    success: true,
                    status: 'emp',
                    token,
                    data: employee
                })
            }
        }
    })

    create = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        const {
            employee_info: { org_id, _id }
        } = req.employee

        let { first_name, last_name, age, gender, phone_number, email, allow_sessions } = req.body

        let employee = await storage.employee.userExist({ phone_number })

        if (employee) return next(new AppError(409, 'Phone number already exist', 'phone number'))

        let employeeOrg = await storage.org.findOne({ _id: org_id })

        let employeeImgId

        if (req.files) {
            employeeImgId = uuidv4()

            let imgFolder = fsSync.existsSync(
                path.join(__dirname, '../', 'assets', 'images', employeeOrg.org_name)
            )

            if (!imgFolder) {
                let orgImgFolder = await fsPromise.mkdir(
                    path.join(__dirname, '../', 'assets', 'images', employeeOrg.org_name)
                )
            }

            let filePath = path.join(
                __dirname,
                '../',
                'assets',
                'images',
                employeeOrg.org_name,
                employeeImgId + '.png'
            )

            await fsPromise.writeFile(filePath, req.files.file.data)
        }

        let employeeAvatar = req.files
            ? `/employee/image/${employeeOrg.org_name}/${employeeImgId}.png`
            : null

        let newEmployee = await storage.employee.create({
            org_id,
            owner_id: _id,
            name: {
                first_name,
                last_name
            },
            age,
            gender,
            phone_number,
            email: email ? email : null,
            allow_sessions: allow_sessions ? allow_sessions : 2,
            avatar: employeeAvatar
        } as IEmployee)

        let smsLinkToken = await signToken(newEmployee._id)

        // await sendMessage(phone_number,`http://192.168.1.129:3005/employee/activate/${smsLinkToken}`)

        await storage.audit.create({
            org_id: employeeOrg._id,
            action: 'create',
            events: `1 employee created <a href="https://invan-pos-updated.herokuapp.com/employee/edit/${newEmployee._id}">${newEmployee.name.first_name}</a>`
        } as IAudit)

        res.status(200).json({
            success: true,
            message: 'Activation link sent',
            status: 'link',
            link: `https://back-office-invan.netlify.app/employee/activate/${smsLinkToken}`
        })
    })

    activate = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { token } = req.params

        let { employee_id } = await decodeToken(token)

        let employee = await storage.employee.findOne({ _id: employee_id })

        if (!employee) return next(new AppError(404, 'Employee not found', 'emp'))

        await storage.employee.update(
            { _id: employee_id },
            {
                state: 'active'
            }
        )

        const session = {
            user_agent: req.headers['user-agent'] as string,
            ip_address:
                (req.headers['x-forwarded-for'] as string) || (req.socket.remoteAddress as string)
        }

        let newUser = await storage.employee.update(
            { phone_number: employee.phone_number },
            {
                $push: { sessions: session }
            }
        )

        let generateToken = await signToken(
            employee_id,
            newUser?.sessions[newUser.sessions.length - 1]?._id as string
        )

        res.status(200).json({
            success: true,
            token: generateToken
        })
    })

    getEmployee = catchAsync(
        async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
            const { id } = req.params
            const {
                employee_info: { status }
            } = req.employee

            let employee = await storage.employee.findAndPopulate({ _id: id })

            if (status == 'admin' && employee.status == 'super_admin')
                return next(new AppError(400, 'You can not edit super admin', 'edit super admin'))

            res.status(200).json({
                success: true,
                data: employee
            })
        }
    )

    editEmployee = catchAsync(
        async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
            const { id } = req.params

            let employeeInfo = await storage.employee.findAndPopulate({ _id: id })

            if (req.employee.status == 'admin' && employeeInfo.status == 'super_admin')
                return next(new AppError(400, 'You can not edit super admin', 'edit super admin'))

            let employeeOrg = employeeInfo.org_id as IOrganization

            let employeeImgId

            if (req.files) {
                employeeImgId = uuidv4()

                let imgFolder = fsSync.existsSync(
                    path.join(__dirname, '../', 'assets', 'images', employeeOrg.org_name)
                )

                if (!imgFolder) {
                    let orgImgFolder = await fsPromise.mkdir(
                        path.join(__dirname, '../', 'assets', 'images', employeeOrg.org_name)
                    )
                }

                let filePath = path.join(
                    __dirname,
                    '../',
                    'assets',
                    'images',
                    employeeOrg.org_name,
                    employeeImgId + '.png'
                )

                await fsPromise.writeFile(filePath, req.files.file.data)
            }

            let employeeAvatar = req.files
                ? `/employee/image/${employeeOrg.org_name}/${employeeImgId}.png`
                : null

            let { first_name, last_name, email, gender, age, allow_sessions } = req.body

            // let { phone_number: empOldPhone } = employeeInfo
            // let isPhoneNumberExist = await storage.employee.userExist({ phone_number })

            // if (empOldPhone != phone_number && isPhoneNumberExist)
            // return next(new AppError(400, 'Phone number already exist', 'phone number'))

            let edit_employee = await storage.employee.update(
                { _id: id },
                { ...req.body, avatar: employeeAvatar }
            )

            await storage.audit.create({
                org_id: employeeOrg._id,
                action: 'update',
                events: `1 employee updated <a href="https://invan-pos-updated.herokuapp.com/employee/edit/${edit_employee._id}">${edit_employee.name.first_name}</a>`
            } as IAudit)

            res.status(200).json({
                success: true,
                data: edit_employee
            })
        }
    )

    getAllEmployee = catchAsync(
        async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
            const {
                employee_info: { _id, status, org_id }
            } = req.employee

            let orgInfo = org_id as IOrganization

            let employees

            if (status == 'super_admin') {
                employees = await storage.employee.findAllandPopulate({ org_id: orgInfo._id })
            } else {
                employees = await storage.employee.findAllandPopulate({ owner_id: _id })
            }

            if (!employees) return next(new AppError(404, 'Employees not found', 'emps'))

            let employeeOwner = employees.find((emp) => emp._id == _id)

            employees = employeeOwner ? employees : [req.employee.employee_info, ...employees]

            res.status(200).json({
                success: true,
                data: employees
            })
        }
    )

    deleteEmployees = catchAsync(
        async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
            const employees = req.body.employees

            const {
                employee_info: { owner_id, _id }
            } = req.employee

            let organizationInfo = req.employee.employee_info.org_id as IOrganization

            if (!employees.length) return next(new AppError(404, 'Emloyees not found', 'emp'))

            let employeeCantDelete = employees.findIndex((empId: string) => empId == _id)

            if (employeeCantDelete != -1) {
                return next(new AppError(400, 'You can not delete your self', 'self delete'))
            }

            let findOwner = employees.findIndex((empId: string) => empId == owner_id)

            if (findOwner != -1) {
                return next(new AppError(400, 'You can not delete your owner', 'delete owner'))
            }

            let employee = await storage.employee.deleteMany({ _id: { $in: employees } })

            let restEmployees = await storage.employee.findAllandPopulate({ owner_id: _id })

            let employeeOwner = restEmployees.find((emp) => emp._id == _id)

            let allRestEmployees = employeeOwner
                ? restEmployees
                : [req.employee.employee_info, ...restEmployees]

            await storage.audit.create({
                org_id: organizationInfo._id,
                action: 'delete',
                events: `${employees.length} employees deleted`
            } as IAudit)

            res.status(200).json({
                success: true,
                data: allRestEmployees
            })
        }
    )
}
