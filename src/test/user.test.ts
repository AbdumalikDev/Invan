import { IUser } from '../models/Employee'
import { UserStorage } from '../storage/mongo/user'
import DB from '../core/db'
const storage = new UserStorage()

beforeAll(async () => {
    const db = new DB()
    await db.connect()
})

afterAll(async () => {
    // await storage.drop()
})

describe('User testing', () => {
    const user = {
        name: {
            firstName: 'Abdumalik'
        },
        organizations: [
            {
                name: 'Invan'
            }
        ],
        phone_number: 998971784749
    }

    const fakePhoneNumber = '998971784748'

    test('create new user: success', () => {
        return storage.create(user as IUser).then((data) => {
            expect(data.phone_number).toEqual(user.phone_number)
        })
    })

    test('create new user: fail (duplicate key error)', () => {
        expect.assertions(1)

        return storage.create(user as IUser).catch((error) => {
            expect(error.code).toEqual(11000)
        })
    })

    test('get user by phone_number: success', () => {
        return storage
            .findOne({
                phone_number: user.phone_number
            })
            .then((data) => {
                expect(data?.phone_number).toEqual(user.phone_number)
            })
    })

    test('get attempt by phone_number: fail (attempt not found)', () => {
        expect.assertions(1)

        return storage
            .findOne({
                phone_number: 998971784748
            })
            .catch((error) => {
                expect(error.statusCode).toEqual(404)
            })
    })

    test('update user by phone_number: success', () => {
        return storage
            .update(user.phone_number, {
                name: {
                    firstName: 'Abdurashid'
                }
            } as IUser)
            .then((data) => {
                expect(data?.name.firstName).toEqual('Abdurashid')
            })
    })

    test('update user: fail (user not found)', () => {
        expect.assertions(1)

        return storage
            .update(fakePhoneNumber, {
                name: {
                    firstName: 'Abdumalik'
                }
            } as IUser)
            .then((data) => {
                expect(data).toEqual(null)
            })
    })

    test('UserExist by phone_number: success', () => {
        return storage.userExist(user.phone_number).then((data) => {
            expect(data).toEqual(true)
        })
    })

    test('UserExist: fail (user not found)', () => {
        expect.assertions(1)

        return storage.userExist(fakePhoneNumber).then((data) => {
            expect(data).toEqual(false)
        })
    })
})
