import { ICategory } from '../models/Category'
import { CategoryStorage } from '../storage/mongo/category'
import DB from '../core/db'
const storage = new CategoryStorage()

beforeAll(async () => {
    const db = new DB()
    await db.connect()
})

afterAll(async () => {
    // await storage.drop()
})

describe('Category testing', () => {
    const category = {
        _id: '819c04d0-7d50-405f-9649-d8ae49e1fba7',
        name: 'oziq-ovqatlar'
    }

    const fakeId = '819c04d0-7d50-405f-9649-d8ae49e1fba5'

    test('create new category: success', () => {
        return storage.create(category as ICategory).then((data) => {
            expect(data.name).toEqual(category.name)
        })
    })

    test('get all category: success', () => {
        return storage.find(category as ICategory).then((data) => {
            expect(data[0].name).toEqual(category.name)
        })
    })

    test('findbyid category:success', () => {
        return storage.findById(category._id).then((data) => {
            expect(data.name).toEqual(category.name)
        })
    })

    test('findbyid category:fail', () => {
        return storage.findById(fakeId).catch((error) => {
            expect(error.statusCode).toEqual(404)
        })
    })
})
