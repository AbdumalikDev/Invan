import { IProduct } from '../models/Product'
import { ProductStorage } from '../storage/mongo/product'
import DB from '../core/db'
const storage = new ProductStorage()

beforeAll(async () => {
    const db = new DB()
    await db.connect()
})

afterAll(async () => {
    // await storage.drop()
})

describe('Product testing', () => {
    const product = {
        _id: '819c04d0-7d50-405f-9649-d8ae49e1fba3',
        org_id: '819c04d0-7d50-405f-9649-d8ae49e1fba7',
        emp_id: '819c04d0-7d50-405f-9649-d8ae49e1fba6',
        name: 'Apple'
    }

    test('create new product: success', () => {
        return storage.create(product as IProduct).then((data) => {
            expect(data.name).toEqual(product.name)
        })
    })

    test('create new product: fail (duplicate key error)', () => {
        expect.assertions(1)

        return storage.create(product as IProduct).catch((error) => {
            expect(error.code).toEqual(11000)
        })
    })

    test('get product: success', () => {
        return storage.find({}).then((data) => {
            expect(data[0].name).toEqual(product.name)
        })
    })

    test('update product by id: success', () => {
        return storage
            .update(product._id, {
                name: 'Orange'
            } as IProduct)
            .then((data) => {
                expect(data.name).toEqual('Orange')
            })
    })

    test('update product: fail (product not found)', () => {
        expect.assertions(1)

        return storage
            .update('819c04d0-7d50-405f-9649-d8ae49e1fba7', {
                name: 'Apple'
            } as IProduct)
            .catch((error) => {
                expect(error.statusCode).toEqual(404)
            })
    })
})
