import { ISmsAuth } from '../models/SmsAuth'
import { SmsAuthStorage } from '../storage/mongo/smsAuth'
import DB from '../core/db'
const storage = new SmsAuthStorage()

beforeAll(async () => {
    const db = new DB()
    await db.connect()
})

afterAll(async () => {
    // await storage.drop()
})

describe('SmsAuth testing', () => {
    const smsAuth = {
        phone_number: 998971784749,
        code: 123456
    }

    const fakePhoneNumber = 998971784748

    test('create new smsAuth: success', () => {
        return storage.create(smsAuth as ISmsAuth).then((data) => {
            expect(data.phone_number).toEqual(smsAuth.phone_number)
        })
    })

    test('create new attempt: fail (duplicate key error)', () => {
        expect.assertions(1)

        return storage.create(smsAuth as ISmsAuth).catch((error) => {
            expect(error.code).toEqual(11000)
        })
    })

    test('get attempt by phone_number: success', () => {
        return storage
            .findOne({
                phone_number: smsAuth.phone_number
            })
            .then((data) => {
                expect(data?.phone_number).toEqual(smsAuth.phone_number)
            })
    })

    test('get smsAuth by phone_number: fail (attempt not found)', () => {
        expect.assertions(1)

        return storage
            .findOne({
                phone_number: fakePhoneNumber
            })
            .then((data) => {
                expect(data).toEqual(null)
            })
    })
})
