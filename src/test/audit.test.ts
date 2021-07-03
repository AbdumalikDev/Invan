import { IAudit } from '../models/Audit'
import { AuditStorage } from '../storage/mongo/audit'
import DB from '../core/db'
const storage = new AuditStorage()

beforeAll(async () => {
    const db = new DB()
    await db.connect()
})

afterAll(async () => {
    // await storage.drop()
})

describe('Audit testing', () => {
    const audit = {
        org_id: "9daedae6-96e0-473d-800f-s0554db0ed4c7",
        action: "create",
        events: "user created"
    }

    test('create new audit: success', () => {
        return storage.create(audit as IAudit).then((data) => {
            expect(data.org_id).toEqual(audit.org_id)
        })
    })

    test('create new audit: fail (duplicate key error)', () => {
        expect.assertions(1)

        return storage.create(audit as IAudit).catch((error) => {
            expect(error.code).toEqual(11000)
        })
    })

    test("get all audit: success", () => {
        return storage.find(audit as IAudit).then((data) => {
            expect(data[0]).toEqual(audit)
        })
    })
    test("get alll audit:fail ", () => {
        expect.assertions(1)

        return storage.find(audit as IAudit).catch((error) => {
            expect(error.code).toEqual(11000)
        })
    })
})
