import { IShipment } from '../models/Shipment'
import { ShipmentStorage } from '../storage/mongo/shipment'
import DB from '../core/db'
const storage = new ShipmentStorage()

beforeAll(async () => {
    const db = new DB()
    await db.connect()
})

afterAll(async () => {
    // await storage.drop()
})

describe('Shipment testing', () => {
    const shipment = {
        _id: "919c04d0-7d50-405f-9649-d8ae49e1fba3",
        org_id: "819c04d0-7d50-405f-9649-d8ae49e1fba3",
        emp_id: "819c04d0-7d50-405f-9649-d8ae49e1fba3",
        warehouse_id: "819c04d0-7d50-405f-9649-d8ae49e1fba3",
        contractor_id: "819c04d0-7d50-405f-9649-d8ae49e1fba3",
        item: ["noks"],
        doc_id: "819c04d0-7d50-405f-9649-d8ae49e1fba3",
        doc_date: "12/12/2021",
        is_checked: true
    }

    test('get one shipment: success', () => {
        return storage.findOne(shipment as IShipment).then((data) => {
            expect(data).toEqual(shipment)
        })
    })

    test('get one shipment:fail ', () => {
        expect.assertions(1)

        return storage.findOne(shipment as IShipment).catch((error) => {
            expect(error.code).toEqual(11000)
        })
    })


    test('create new shipment: success', () => {
        return storage.create(shipment as IShipment).then((data) => {
            expect(data.item).toEqual(shipment.item)
        })
    })

    test('create new shipment: fail (duplicate key error)', () => {
        expect.assertions(1)
        return storage.create(shipment as IShipment).catch((error) => {
            expect(error.code).toEqual(11000)
        })
    })

    test('get shipment: success', () => {
        return storage.findAndPopulate({}).then((data) => {
            expect(data).toEqual(shipment)
        })
    })

    test('get shipment:fail', () => {
        expect.assertions(1)

        return storage.findAndPopulate({}).catch((error) => {
            expect(error.code).toEqual(11000)
        })
    })

    test('update shipment by id: success', () => {
        return storage
            .update(shipment._id, {
                item: ["nok"]
            } as IShipment)
            .then((data) => {
                expect(data).toEqual('nok')
            })
    })

    test('update shipment: fail (shipment not found)', () => {
        expect.assertions(1)

        return storage
            .update('819c04d0-7d50-405f-9649-d8ae49e1fba7', {
                item: ["nok"]
            } as IShipment)
            .catch((error) => {
                expect(error.statusCode).toEqual(404)
            })
    })

    test('delete shipment: success', () => {
        return storage.delete({shipment:shipment}).then((data) => {
            expect(data).toEqual('Successfully deleted')
        })
    })

    test('delete shipment: fail (shipment not found)', () => {
        expect.assertions(1)

        return storage.delete(shipment._id).catch((error) => {
            expect(error.statusCode).toEqual(404)
        })
    })

})
