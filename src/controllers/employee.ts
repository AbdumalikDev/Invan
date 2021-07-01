import { NextFunction, Request, Response } from 'express'
import { storage } from '../storage/main'
import catchAsync from '../utils/catchAsync'
import smsSend, { sendMessage } from './smsSend'
import AppError from '../utils/appError'
import  Employee, { IEmployee }  from "../models/Employee"
import { signToken, IGetUserAuthInfoRequest, decodeToken } from './auth'
import moment from 'moment'
import path from "path"
import fsPromise from "fs/promises"
import fsSync from "fs"
import { v4 as uuidv4 } from 'uuid'
import { IAudit } from "../models/Audit"


export class EmployeeController {

    login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

        if (!req.body.code) {
            const code: number = Math.floor(100000 + Math.random() * 900000)
            const phone_number: number = Number(req.body.phone_number)

            let findEmployee = await storage.employee.userExist({ phone_number })

            if (!findEmployee) return next(new AppError(404, 'Employee is not found', 'phone'))
            
            let statusOfEmployee= await storage.employee.findOne({phone_number})

            if(statusOfEmployee.state!='active') return next(new AppError(400,'Your account is not active','account'))

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
            const employee = await storage.employee.findOne({ phone_number })

            const code = await storage.smsAuth.findOne({ phone_number })

            if (!code) {
                return next(new AppError(409, 'SMS code already sent', 'sms'))
            }

            if (code.code !== enteredCode) {
                return next(new AppError(403, 'SMS code is incorrect', 'sms'))
            }
            if(employee.state!='active'){
                return next(new AppError(400,'Your account is not active','account'))
            }
            
            const session = {
                user_agent: req.headers['user-agent'] as string,
                ip_address:
                    (req.headers['x-forwarded-for'] as string) ||
                    (req.socket.remoteAddress as string)
            }


            let oldEmployeeSession = employee.sessions.find(usersession => {
                return usersession.ip_address == session.ip_address && usersession.user_agent == session.user_agent
            })
            let token;
            if (employee.sessions.length >= employee.allow_sessions) {
                let user_id: string;
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

              
                console.log(employee)
                res.status(200).json({
                    success: true,
                    status: 'employee',
                    token
                })
            } else {
                if (oldEmployeeSession) {
                    let oldUserDelete = await storage.employee.update({ phone_number }, {
                        $pull: { sessions: { _id: oldEmployeeSession._id } }
                    })
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

                
                console.log(employee)
                res.status(200).json({
                    success: true,
                    status: 'employee',
                    token
                })
            }
        }
    })

    create = catchAsync(async (req:IGetUserAuthInfoRequest, res:Response, next:NextFunction) =>{

        const { employee_info:{ status, org_id, owner_id, _id} } = req.employee

        // if(status!='super_admin') return next(new AppError(405,"You do not have permission.",'emp'))

        let { first_name, last_name, age, gender, phone_number, email, allow_sessions }  = req.body
        
        let employee = await storage.employee.userExist({phone_number})

        if(employee) return next(new AppError(409,'Employee already exist','emp'))

        let employeeOrg = await storage.org.findOne({_id:org_id})

        
        let employeeImgId;  
        if(req.files){
            
            employeeImgId = uuidv4()
            
            let imgFolder = fsSync.existsSync(path.join(__dirname,'../','assets','images',employeeOrg.org_name))
            
            if(!imgFolder){
                let orgImgFolder = await fsPromise.mkdir(path.join(__dirname,'../','assets','images',employeeOrg.org_name))
            }
            
            let filePath = path.join(__dirname,'../','assets','images',employeeOrg.org_name,employeeImgId+'.png')
            
            await fsPromise.writeFile(filePath,req.files.file.data)
        }

        let employeeAvatar = req.files ? `/${employeeOrg.org_name}/${employeeImgId}.png` : null

         let newEmployee = await storage.employee.create({
            org_id,
            owner_id,
            name:{
                first_name,
                last_name
            },
            age,
            gender,
            phone_number,
            email,
            allow_sessions,
            avatar:employeeAvatar
        } as IEmployee)
        
        let smsLinkToken = await signToken(newEmployee._id)
        
        await storage.audit.create({
            org_id,
            employee_id:_id,
            action:'create',
            events:'1 employee were created',
            link_info: {
                link:`/employee/edit/${newEmployee._id}`,
                name:`${newEmployee.name.first_name}`
            }
        } as IAudit)

        // // await sendMessage(phone_number,`http://192.168.1.129:3000/employee/activate/${smsLinkToken}`)

        res.status(200).json({
            success:true,
            message:"Activation link sent",
            status:'link',
            link:`http://192.168.1.129:3000/employee/activate/${smsLinkToken}`
        })
    })

    activate = catchAsync(async (req:Request, res:Response, next:NextFunction)=>{
        const { token } = req.params
        console.log(token)
        let {employee_id} = await decodeToken(token)

        if(!employee_id) return next(new AppError(404,'Employee id not found','id'))

        let employee = await storage.employee.findOne({_id:employee_id})

        if(!employee) return next(new AppError(404,'Employee not found','emp'))

        await storage.employee.update({_id:employee_id},{
            state:'active'
        })

        res.status(200).json({
            success:true,
            message:"Employee activated",
            status:'employee'
        })

    })

    allAudits = catchAsync(async (req:IGetUserAuthInfoRequest, res:Response, next:NextFunction) =>{

        const { employee_info:{ _id, status }} = req.employee

        const allAudits = await storage.audit.findAndPopulate({employee_id:_id})

        if(!allAudits.length) return next(new AppError(404,'Audits not found', 'auidits'))

        res.status(200).json({
            success:true,
            data:allAudits,
            status:'audits'
        })
    })

    edit = catchAsync(async (req:Request, res:Response, next:NextFunction) =>{
        const { id } = req.params
    })
}