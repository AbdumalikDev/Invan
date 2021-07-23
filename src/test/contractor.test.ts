import { IContractor } from '../models/Contractor'
import { ContractorStorage } from '../storage/mongo/contractor'
import DB from '../core/db'
const storage = new ContractorStorage()

beforeAll(async () => {
    const db = new DB()
    await db.connect()
})

afterAll(async () => {
    // await storage.drop()
})

describe('Contractor testing', () => {
    const contractor = {
        _id: '819c04d0-7d50-405f-9649-d8ae49e1fba3',
        name: "Ibrohim",
        org_id: '819c04d0-7d50-405f-9649-d8ae49e1fba7',
        emp_id: '819c04d0-7d50-405f-9649-d8ae49e1fba6',
    }

    test('create new contractor: success', () => {
        return storage.create(contractor as IContractor).then((data) => {
            expect(data.name).toEqual(contractor.name)
        })
    })

    test('create new contractor: fail (duplicate key error)', () => {
        expect.assertions(1)

        return storage.create(contractor as IContractor).catch((error) => {
            expect(error.code).toEqual(11000)
        })
    })

    test('get contractor: success', () => {
        return storage.find({}).then((data) => {
            expect(data[0].name).toEqual(contractor.name)
        })
    })

    test('delete contractor: success', () => {
        return storage.delete(contractor._id).then((data) => {
            expect(data).toEqual('Successfully deleted')
        })
    })

    test('delete contractor: fail (contractor not found)', () => {
        expect.assertions(1)

        return storage.delete(contractor._id).catch((error) => {
            expect(error.statusCode).toEqual(404)
        })
    })

    test('update contractor by id: success', () => {
        return storage
            .update(contractor._id, {
                name: 'Ibro'
            } as IContractor)
            .then((data) => {
                expect(data.name).toEqual('Ibro')
            })
    })

    test('update contractor: fail (contractor not found)', () => {
        expect.assertions(1)

        return storage
            .update('819c04d0-7d50-405f-9649-d8ae49e1fba7', {
                name: 'Dilshod'
            } as IContractor)
            .catch((error) => {
                expect(error.statusCode).toEqual(404)
            })
    })


    test('get one contractor: success', () => {
        return storage.findOne(contractor as IContractor).then((data) => {
            expect(data).toEqual(contractor)
        })
    })

    test('get one contractor:fail ', () => {
        expect.assertions(1)

        return storage.findOne(contractor as IContractor).catch((error) => {
            expect(error.code).toEqual(11000)
        })
    })

})
