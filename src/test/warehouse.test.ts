import { IWarehouse } from '../models/Warehouse'
import { WarehouseStorage } from '../storage/mongo/warehouse'
import DB from '../core/db'
const storage = new WarehouseStorage()

beforeAll(async () => {
    const db = new DB()
    await db.connect()
})

afterAll(async () => {
    // await storage.drop()
})

describe('Warehouse testing', () => {
    const warehouse = {
        _id: '819c04d0-7d50-405f-9649-d8ae49e1fba3',
        org_id: '819c04d0-7d50-405f-9649-d8ae49e1fba7',
        emp_id: '819c04d0-7d50-405f-9649-d8ae49e1fba6',
        name: "ibro"
    }

    test('create new warehouse: success', () => {
        return storage.create(warehouse as IWarehouse).then((data) => {
            expect(data.name).toEqual(warehouse.name)
        })
    })

    test('create new warehouse: fail (duplicate key error)', () => {
        expect.assertions(1)
        return storage.create(warehouse as IWarehouse).catch((error) => {
            expect(error.code).toEqual(11000)
        })
    })

    test('get warehouse: success', () => {
        return storage.find({}).then((data) => {
            expect(data).toEqual(warehouse)
        })
    })

    test('update warehouse by id: success', () => {
        return storage
            .update(warehouse._id, {
                name: "ibro"
            } as IWarehouse)
            .then((data) => {
                expect(data).toEqual("ibro")
            })
    })

    test('update warehouse: fail (warehouse not found)', () => {
        expect.assertions(1)

        return storage
            .update('819c04d0-7d50-405f-9649-d8ae49e1fba7', {
                name: "ibroo"
            } as IWarehouse)
            .catch((error) => {
                expect(error.statusCode).toEqual(404)
            })
    })

    test('get one warehouse: success', () => {
        return storage.findOne(warehouse as IWarehouse).then((data) => {
            expect(data).toEqual(warehouse)
        })
    })

    test('get one warehouse:fail ', () => {
        expect.assertions(1)

        return storage.findOne(warehouse as IWarehouse).catch((error) => {
            expect(error.code).toEqual(11000)
        })
    })

    test('delete warehouse: success', () => {
        return storage.delete(warehouse._id).then((data) => {
            expect(data).toEqual('Successfully deleted')
        })
    })

    test('delete warehouse: fail (warehouse not found)', () => {
        expect.assertions(1)

        return storage.delete(warehouse._id).catch((error) => {
            expect(error.statusCode).toEqual(404)
        })
    })

})
