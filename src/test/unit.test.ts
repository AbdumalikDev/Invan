import { IUnit } from '../models/Unit'
import { UnitStorage } from '../storage/mongo/unit'
import DB from '../core/db'

const storage = new UnitStorage()

beforeAll(async () => {
    const db = new DB()
    await db.connect()
})

afterAll(async () => {
    // await storage.drop()
})

describe('Unit testing', () => {
    const unit = {
<<<<<<< HEAD
        name: "Ikhtiyor",
        full_name: "abc",

=======
        name: 'Ikhtiyor',
        full_name: 'abc'
>>>>>>> 89dda6e70a30aaff3738e1d872b3740d7399593c
    }

    test('create new unit: success', () => {
        return storage.create(unit as IUnit).then((data) => {
            expect(data.name).toEqual(unit.name)
        })
    })

<<<<<<< HEAD
    test('create new unit: fail (duplicate key error)', () => {
        expect.assertions(1)

        return storage.create(unit as IUnit).catch((error) => {
            expect(error.code).toEqual(11000)
        })
    })

    test("get all unit: success", () => {
        return storage.find(unit as IUnit).then((data) => {
            expect(data[0]).toEqual(unit)
        })
    })

    test("get all unit:fail ", () => {
        expect.assertions(1)

        return storage.find(unit as IUnit).catch((error) => {
            expect(error.code).toEqual(11000)
        })
    })

=======
    test('get all unit: success', () => {
        return storage.find(unit as IUnit).then((data) => {
            expect(data[0].name).toEqual(unit.name)
        })
    })
>>>>>>> 89dda6e70a30aaff3738e1d872b3740d7399593c
})
