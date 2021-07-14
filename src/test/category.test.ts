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

    test('create new category: success', () => {
        return storage.create(category as ICategory).then((data) => {
            expect(data).toEqual(category)
        })
    })

    test('create new category: fail (duplicate key error)', () => {
        expect.assertions(1)

        return storage.create(category as ICategory).catch((error) => {
            expect(error.code).toEqual(11000)
        })
    })

    test('get all category: success', () => {
        return storage.find(category as ICategory).then((data) => {
            expect(data).toEqual(category)
        })
    })
    test('get alll category:fail ', () => {
        expect.assertions(1)

        return storage.find(category as ICategory).catch((error) => {
            expect(error.code).toEqual(11000)
        })
    })

    // test("update category:success", () => {
    //     return storage.update(category as ICategory).then((data)=>{

    //     })
    // })
})
