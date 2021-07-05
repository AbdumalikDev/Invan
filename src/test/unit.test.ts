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
        name: 'Ikhtiyor',
        full_name: 'abc'
    }

    test('create new unit: success', () => {
        return storage.create(unit as IUnit).then((data) => {
            expect(data.name).toEqual(unit.name)
        })
    })

    test('get all unit: success', () => {
        return storage.find(unit as IUnit).then((data) => {
            expect(data[0].name).toEqual(unit.name)
        })
    })
})
