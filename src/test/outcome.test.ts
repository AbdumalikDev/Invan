import { IOutcome } from '../models/Outcome'
import { OutcomeStorage } from '../storage/mongo/outcome'
import DB from '../core/db'
const storage = new OutcomeStorage()

beforeAll(async () => {
    const db = new DB()
    await db.connect()
})

afterAll(async () => {
    // await storage.drop()
})

describe('Outcome testing', () => {
    const outcome = {
        _id: '819c04d0-7d50-405f-9649-d8ae49e1fba3',
        payment_type: "cash",
        sum: 43,
        org_id: '819c04d0-7d50-405f-9649-d8ae49e1fba7',
        emp_id: '819c04d0-7d50-405f-9649-d8ae49e1fba6'
    }

    test('get one outcome: success', () => {
        return storage.findOne(outcome as IOutcome).then((data) => {
            expect(data).toEqual(outcome)
        })
    })

    test('get one outcome:fail ', () => {
        expect.assertions(1)

        return storage.findOne(outcome as IOutcome).catch((error) => {
            expect(error.code).toEqual(11000)
        })
    })


    test('create new outcome: success', () => {
        return storage.create(outcome as IOutcome).then((data) => {
            expect(data.sum).toEqual(outcome.sum)
        })
    })

    test('create new outcome: fail (duplicate key error)', () => {
        expect.assertions(1)
        return storage.create(outcome as IOutcome).catch((error) => {
            expect(error.code).toEqual(11000)
        })
    })

    test('get outcome: success', () => {
        return storage.find({}).then((data) => {
            expect(data).toEqual(outcome)
        })
    })

    test('get outcome:fail', () => {
        expect.assertions(1)

      return storage.find({}).catch((error) => {
            expect(error.code).toEqual(11000)
        })
    })

    test('update outcome by id: success', () => {
        return storage
            .update(outcome._id, {
                sum: 123
            } as IOutcome)
            .then((data) => {
                expect(data).toEqual(123)
            })
    })

    test('update outcome: fail (outcome not found)', () => {
        expect.assertions(1)

        return storage
            .update('819c04d0-7d50-405f-9649-d8ae49e1fba7', {
                sum: 12
            } as IOutcome)
            .catch((error) => {
                expect(error.statusCode).toEqual(404)
            })
    })

    test('delete outcome: success', () => {
        return storage.delete(outcome._id).then((data) => {
            expect(data).toEqual('Successfully deleted')
        })
    })

    test('delete outcome: fail (outcome not found)', () => {
        expect.assertions(1)

        return storage.delete(outcome._id).catch((error) => {
            expect(error.statusCode).toEqual(404)
        })
    })

})
