// import { IGroup } from '../models/Group'
// import { GroupStorage } from '../storage/mongo/group'
// import DB from '../core/db'
// const storage = new GroupStorage()

// beforeAll(async () => {
//     const db = new DB()
//     await db.connect()
// })

// afterAll(async () => {
//     // await storage.drop()
// })

// describe('Group testing', () => {
//     const group = {
//         _id: '819c04d0-7d50-405f-9649-d8ae49e1fba8',
//         org_id: '819c04d0-7d50-405f-9649-d8ae49e1fba7',
//         name: 'orbitchi'
//     }

//     test('create new group: success', () => {
//         return storage.create(group as IGroup).then((data) => {
//             expect(data.name).toEqual(group.name)
//         })
//     })

//     test('create new group: fail (duplicate key error)', () => {
//         expect.assertions(1)

//         return storage.create(group as IGroup).catch((error) => {
//             expect(error.code).toEqual(11000)
//         })
//     })

//     test('get all groups: success', () => {
//         return storage.find(group as IGroup).then((data) => {
//             expect(data).toEqual(data)
//         })
//     })

//     test('get all group:fail ', () => {
//         expect.assertions(0)

//         return storage.find(group as IGroup).catch((error) => {
//             expect(error.code).toEqual(11000)
//         })
//     })
// })

import { IGroup } from '../models/Group'
import { GroupStorage } from '../storage/mongo/group'
import DB from '../core/db'
const storage = new GroupStorage()

beforeAll(async () => {
    const db = new DB()
    await db.connect()
})

afterAll(async () => {
    // await storage.drop()
})

describe('Group testing', () => {
    const group = {
        _id: '819c04d0-7d50-405f-9649-d8ae49e1fba3',
        org_id: '819c04d0-7d50-405f-9649-d8ae49e1fba7',
        name:"orbitchi"
    }

    test('create new group: success', () => {
        return storage.create(group as IGroup).then((data) => {
            expect(data.name).toEqual(group.name)
        })
    })

    test('create new group: fail (duplicate key error)', () => {
        expect.assertions(1)
        return storage.create(group as IGroup).catch((error) => {
            expect(error.code).toEqual(11000)
        })
    })

    test('get group: success', () => {
        return storage.find({}).then((data) => {
            expect(data).toEqual(group)
        })
    })

    test('update group by id: success', () => {
        return storage
            .update(group._id, {
                name: "123"
            } as IGroup)
            .then((data) => {
                expect(data).toEqual("123")
            })
    })

    test('update group: fail (group not found)', () => {
        expect.assertions(1)

        return storage
            .update('819c04d0-7d50-405f-9649-d8ae49e1fba7', {
                name: "12"
            } as IGroup)
            .catch((error) => {
                expect(error.statusCode).toEqual(404)
            })
    })

    test('get one group: success', () => {
        return storage.findOne(group as IGroup).then((data) => {
            expect(data).toEqual(group)
        })
    })

    test('get one group:fail ', () => {
        expect.assertions(1)

        return storage.findOne(group as IGroup).catch((error) => {
            expect(error.code).toEqual(11000)
        })
    })

    test('delete group: success', () => {
        return storage.delete(group._id).then((data) => {
            expect(data).toEqual('Successfully deleted')
        })
    })

    test('delete group: fail (group not found)', () => {
        expect.assertions(1)

        return storage.delete(group._id).catch((error) => {
            expect(error.statusCode).toEqual(404)
        })
    })

})
