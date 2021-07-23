import { IIncome } from '../models/Income'
import { IncomeStorage } from '../storage/mongo/income'
import DB from '../core/db'
const storage = new IncomeStorage()

beforeAll(async () => {
    const db = new DB()
    await db.connect()
})

afterAll(async () => {
    // await storage.drop()
})

describe('Income testing', () => {
    const income = {
        _id: '819c04d0-7d50-405f-9649-d8ae49e1fba3',
        payment_type: "cash",
        sum: 43,
        org_id: '819c04d0-7d50-405f-9649-d8ae49e1fba7',
        emp_id: '819c04d0-7d50-405f-9649-d8ae49e1fba6'
    }

    test('get one income: success', () => {
        return storage.findOne(income as IIncome).then((data) => {
            expect(data).toEqual(income)
        })
    })

    test('get one income:fail ', () => {
        expect.assertions(1)

        return storage.findOne(income as IIncome).catch((error) => {
            expect(error.code).toEqual(11000)
        })
    })


    test('create new income: success', () => {
        return storage.create(income as IIncome).then((data) => {
            expect(data.sum).toEqual(income.sum)
        })
    })

    test('create new income: fail (duplicate key error)', () => {
        expect.assertions(1)
        return storage.create(income as IIncome).catch((error) => {
            expect(error.code).toEqual(11000)
        })
    })

    test('get income: success', () => {
        return storage.find({}).then((data) => {
            expect(data).toEqual(income)
        })
    })

    test('get income:fail', () => {
        expect.assertions(1)

      return storage.find({}).catch((error) => {
            expect(error.code).toEqual(11000)
        })
    })

    test('update income by id: success', () => {
        return storage
            .update(income._id, {
                sum: 123
            } as IIncome)
            .then((data) => {
                expect(data).toEqual(123)
            })
    })

    test('update income: fail (income not found)', () => {
        expect.assertions(1)

        return storage
            .update('819c04d0-7d50-405f-9649-d8ae49e1fba7', {
                sum: 12
            } as IIncome)
            .catch((error) => {
                expect(error.statusCode).toEqual(404)
            })
    })

    test('delete income: success', () => {
        return storage.delete(income._id).then((data) => {
            expect(data).toEqual('Successfully deleted')
        })
    })

    test('delete income: fail (income not found)', () => {
        expect.assertions(1)

        return storage.delete(income._id).catch((error) => {
            expect(error.statusCode).toEqual(404)
        })
    })

})
