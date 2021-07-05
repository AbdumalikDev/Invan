import { IEmployee } from '../models/Employee'
import { EmployeeStorage } from '../storage/mongo/employee'
import DB from '../core/db'
const storage = new EmployeeStorage()

beforeAll(async () => {
    const db = new DB()
    await db.connect()
})

afterAll(async () => {
    // await storage.drop()
})

describe('Employee testing', () => {
    const employee = {
        _id: '819c04d0-7d50-405f-9649-d8ae49e1fbc0',
        org_id: '819c04d0-7d50-405f-9649-d8ae49e1fbc2',
        name: {
            first_name: 'Abdumalik'
        },

        phone_number: 998971784749,
        sessions: [
            {
                user_agent: 'abc',
                ip_address: '1243.2343'
            }
        ]
    }

    const fakePhoneNumber = '998971784748'

    test('create new employee: success', () => {
        return storage.create(employee as IEmployee).then((data) => {
            expect(data.phone_number).toEqual(employee.phone_number)
        })
    })

    test('create new employee: fail (duplicate key error)', () => {
        expect.assertions(1)

        return storage.create(employee as IEmployee).catch((error) => {
            expect(error.code).toEqual(11000)
        })
    })

    test('get employee by phone_number: success', () => {
        return storage
            .findOne({
                phone_number: employee.phone_number
            })
            .then((data) => {
                expect(data?.phone_number).toEqual(employee.phone_number)
            })
    })

    test('get employee by phone_number: fail (attempt not found)', () => {
        expect.assertions(1)

        return storage
            .findOne({
                phone_number: fakePhoneNumber
            })
            .catch((error) => {
                expect(error.statusCode).toEqual(404)
            })
    })

    test('update employee by phone_number: success', () => {
        return storage
            .update(employee.phone_number, {
                name: {
                    first_name: 'Abdurashid'
                }
            } as IEmployee)
            .then((data) => {
                expect(data?.name.first_name).toEqual('Abdurashid')
            })
    })

    test('update employee: fail (employee not found)', () => {
        expect.assertions(1)

        return storage
            .update(fakePhoneNumber, {
                name: {
                    first_name: 'Abdumalik'
                }
            } as IEmployee)
            .catch((error) => {
                expect(error.statusCode).toEqual(404)
            })
    })

    test('UserExist by phone_number: success', () => {
        return storage.userExist(employee.phone_number).then((data) => {
            expect(data).toEqual(true)
        })
    })

    test('UserExist: fail (employee not found)', () => {
        expect.assertions(1)

        return storage.userExist(fakePhoneNumber).then((data) => {
            expect(data).toEqual(false)
        })
    })
})
