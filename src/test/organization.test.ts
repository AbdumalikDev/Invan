import { IOrganization } from '../models/Organization'
import { OrganizationStorage } from '../storage/mongo/organization'
import DB from '../core/db'
const storage = new OrganizationStorage()

beforeAll(async () => {
    const db = new DB()
    await db.connect()
})

afterAll(async () => {
    // await storage.drop()
})

describe('Organization testing', () => {
    const organization = {
<<<<<<< HEAD
        org_name: "ibro",
        current_tarif: "free",
        phone_number: 998901854545
    }

=======
        org_name: 'ibro',
        phone_number: 998901854545
    }

    const fakeNumber = 998971784749

>>>>>>> 89dda6e70a30aaff3738e1d872b3740d7399593c
    test('create new organization: success', () => {
        return storage.create(organization as IOrganization).then((data) => {
            expect(data.org_name).toEqual(organization.org_name)
        })
    })

    test('create new organization: fail (duplicate key error)', () => {
        expect.assertions(1)

        return storage.create(organization as IOrganization).catch((error) => {
            expect(error.code).toEqual(11000)
        })
    })

<<<<<<< HEAD
    test("get one organization: success", () => {
        return storage.findOne(organization as IOrganization).then((data) => {
            expect(data).toEqual(organization)
        })
    })
    test("get one organization:fail ", () => {
        expect.assertions(1)

        return storage.findOne(organization as IOrganization).catch((error) => {
            expect(error.code).toEqual(11000)
        })
    })

    test("Organization exist:Success", () => {
        return storage.orgExist(organization as IOrganization).then((data) => {
            expect(data).toEqual(true)
        })
    })
    
    test("Organization exsit:Fail", () => {
        expect.assertions(1)

        return storage.orgExist(organization as IOrganization).catch((error) => {
            expect(error.code).toEqual(11000)
=======
    test('get one organization: success', () => {
        return storage.findOne({ phone_number: organization.phone_number }).then((data) => {
            expect(data.phone_number).toEqual(organization.phone_number)
        })
    })
    test('get one organization:fail ', () => {
        expect.assertions(1)

        return storage.findOne({ phone_number: fakeNumber }).catch((error) => {
            expect(error.statusCode).toEqual(404)
        })
    })

    test('Organization exist:Success', () => {
        return storage.orgExist({ phone_number: organization.phone_number }).then((data) => {
            expect(data).toEqual(true)
        })
    })

    test('Organization exist:Fail', () => {
        expect.assertions(1)

        return storage.orgExist({ phone_number: fakeNumber }).then((data) => {
            expect(data).toEqual(false)
>>>>>>> 89dda6e70a30aaff3738e1d872b3740d7399593c
        })
    })
})
