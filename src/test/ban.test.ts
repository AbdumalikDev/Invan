import { IBan } from '../models/Ban'
import { BanStorage } from '../storage/mongo/ban'
import DB from '../core/db'
const storage = new BanStorage()

beforeAll(async () => {
    const db = new DB()
    await db.connect()
})

afterAll(async () => {
    // await storage.drop()
})

describe('Ban testing', () => {
    const ban = {
        phone_number: 998971784749
    }

    const fakePhoneNumber = '998971784748'

    test('create new ban: success', () => {
        return storage.create(ban as IBan).then((data) => {
            expect(data.phone_number).toEqual(ban.phone_number)
        })
    })

    test('create new ban: fail (duplicate key error)', () => {
        expect.assertions(1)

        return storage.create(ban as IBan).catch((error) => {
            expect(error.code).toEqual(11000)
        })
    })

    test('get ban by phone_number: success', () => {
        return storage
            .findOne({
                phone_number: ban.phone_number
            })
            .then((data) => {
                expect(data?.phone_number).toEqual(ban.phone_number)
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
})
