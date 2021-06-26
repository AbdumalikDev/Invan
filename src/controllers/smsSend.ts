import FormData from 'form-data'
import axios from 'axios'
import { NextFunction, Request, Response } from 'express'
import AppError from '../utils/appError'
import { storage } from '../storage/main'
import { IAttempt } from '../models/Attempt'
import { IBan } from '../models/Ban'
import { ISmsAuth } from '../models/SmsAuth'
import moment from 'moment'

async function sendMessage(phone_number: number, code: number) {
    const data = new FormData()
    data.append('mobile_phone', phone_number)
    data.append('message', code)
    data.append('from', '4546')
    data.append('callback_url', 'http://0000.uz/test.php')

    const response = await axios({
        method: 'post',
        url: 'https://notify.eskiz.uz/api/message/sms/send',
        headers: {
            Authorization:
                'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvbm90aWZ5LmVza2l6LnV6XC9hcGlcL2F1dGhcL2xvZ2luIiwiaWF0IjoxNjIyNTYxNTI2LCJleHAiOjE2MjUxNTM1MjYsIm5iZiI6MTYyMjU2MTUyNiwianRpIjoiT00xWlhBbDlmNlJoVkRVciIsInN1YiI6NDE0LCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.wwI2SEa3_5zSR4X8GxBJz-ld4X7bOWdNix06IaVhlPI',
            ...data.getHeaders()
        },
        data: data
    })
    return response
}

async function sendSMS_Attempt_Ban(
    phone_number: number,
    code: number,
    userAttempt: IAttempt | null,
    req: Request,
    res: Response,
    next: NextFunction
) {
    let response, success: boolean, status: string
    let smsAuth
    if (!userAttempt) {
        // response = await sendMessage(phone_number, code)

        // if (response.status !== 200)
        //     return next(new AppError(response.status, 'SMS not sent', 'sms'))

        smsAuth = await storage.smsAuth.create({ phone_number, code } as ISmsAuth)
        await storage.attempt.create({ phone_number } as IAttempt)
        status = 'sms'
        success = true
    } else if (!(userAttempt?.attempts === 2)) {
        // response = await sendMessage(phone_number, code)

        // if (response.status !== 200)
        //     return next(new AppError(response.status, 'SMS code not sent', 'sms'))

        smsAuth = await storage.smsAuth.create({ phone_number, code } as ISmsAuth)

        await storage.attempt.update({ phone_number }, {
            attempts: userAttempt?.attempts + 1
        } as IAttempt)

        success = true
        status = 'sms'
    } else {
        const userBan = await storage.ban.create({ phone_number } as IBan)
        await storage.attempt.delete({ phone_number })
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

    res.status(200).json({
        success: true,
        status: 'sms',
        message: 'SMS code sent',
        time: moment(await smsAuth.createdAt)
            .add(3, 'm')
            .toDate()
            .getTime(),
        code
    })
}
export default sendSMS_Attempt_Ban
