import { IAttempt } from '../models/Attempt'
import { AttemptStorage } from '../storage/mongo/attempt'
import DB from '../core/db'
const storage = new AttemptStorage()

beforeAll(async () => {
    const db = new DB()
    await db.connect()
})

afterAll(async () => {
    // await storage.drop()
})

describe('Attempt testing', () => {
    const attempt = {
        phone_number: 998971784749
    }

    const fakePhoneNumber = '998971784748'

    test('create new attempt: success', () => {
        return storage.create(attempt as IAttempt).then((data) => {
            expect(data.phone_number).toEqual(attempt.phone_number)
        })
    })

    test('create new attempt: fail (duplicate key error)', () => {
        expect.assertions(1)

        return storage.create(attempt as IAttempt).catch((error) => {
            expect(error.code).toEqual(11000)
        })
    })

    test('get attempt by phone_number: success', () => {
        return storage
            .findOne({
                phone_number: attempt.phone_number
            })
            .then((data) => {
                expect(data?.phone_number).toEqual(attempt.phone_number)
            })
    })

    test('get attempt by phone_number: fail (attempt not found)', () => {
        expect.assertions(1)

        return storage
            .findOne({
                phone_number: 998971784748
            })
            .then((data) => {
                expect(data).toEqual(null)
            })
    })

    test('update attempt by phone_number: success', () => {
        return storage
            .update(attempt.phone_number, {
                attempts: 1
            } as IAttempt)
            .then((data) => {
                expect(data.attempts).toEqual(1)
            })
    })

    test('update user: fail (user not found)', () => {
        expect.assertions(1)

        return storage
            .update(fakePhoneNumber, {
                attempts: 1
            } as IAttempt)
            .catch((error) => {
                expect(error.statusCode).toEqual(404)
            })
    })

    test('delete attempt: success', () => {
        return storage.delete(attempt.phone_number).then((data) => {
            expect(data).toEqual('Successfully deleted')
        })
    })

    test('delete attempt: fail (attempt not found)', () => {
        expect.assertions(1)

        return storage.delete(attempt.phone_number).catch((error) => {
            expect(error.statusCode).toEqual(404)
        })
    })
})
