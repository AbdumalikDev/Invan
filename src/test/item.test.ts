import { IItem } from '../models/Item'
import { ItemStorage } from '../storage/mongo/Item'
import DB from '../core/db'
const storage = new ItemStorage()

beforeAll(async () => {
    const db = new DB()
    await db.connect()
})

afterAll(async () => {
    // await storage.drop()
})

describe('Item testing', () => {
    const item = {
        _id: '819c04d0-7d50-405f-9649-d8ae49e1fba3',
        product_id: "819c04d0-7d50-405f-9649-d8ae49e1fba3",
        cost: 4311,
        quantity: 43,
        org_id: '819c04d0-7d50-405f-9649-d8ae49e1fba7',
        emp_id: '819c04d0-7d50-405f-9649-d8ae49e1fba6',
    }

    test('create new item: success', () => {
        return storage.create(item as IItem).then((data) => {
            expect(data.cost).toEqual(item.cost)
        })
    })

    test('create new item: fail (duplicate key error)', () => {
        expect.assertions(1)
        return storage.create(item as IItem).catch((error) => {
            expect(error.code).toEqual(11000)
        })
    })

    test('get item: success', () => {
        return storage.find({}).then((data) => {
            expect(data).toEqual(item)
        })
    })

    test('update item by id: success', () => {
        return storage
            .update(item._id, {
                cost: 123
            } as IItem)
            .then((data) => {
                expect(data).toEqual(123)
            })
    })

    test('update item: fail (item not found)', () => {
        expect.assertions(1)

        return storage
            .update('819c04d0-7d50-405f-9649-d8ae49e1fba7', {
                quantity: 12
            } as IItem)
            .catch((error) => {
                expect(error.statusCode).toEqual(404)
            })
    })
    
    test('get one item: success', () => {
        return storage.findOne(item as IItem).then((data) => {
            expect(data).toEqual(item)
        })
    })

    test('get one item:fail ', () => {
        expect.assertions(1)

        return storage.findOne(item as IItem).catch((error) => {
            expect(error.code).toEqual(11000)
        })
    })

    test('delete item: success', () => {
        return storage.delete(item._id).then((data) => {
            expect(data).toEqual('Successfully deleted')
        })
    })

    test('delete item: fail (item not found)', () => {
        expect.assertions(1)

        return storage.delete(item._id).catch((error) => {
            expect(error.statusCode).toEqual(404)
        })
    })

})
