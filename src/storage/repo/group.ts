import { IGroup } from '../../models/Group'

export interface IGroupAllResponse {
    payloads: IGroup[]
    count: number
}

export interface GroupRepo {
    create(payload: IGroup): Promise<IGroup>
    update(query: Object, payload: IGroup): Promise<IGroup>
    deleteMany(query: Object): Promise<string>
    find(query: Object): Promise<IGroup[]>
    findOne(query: Object): Promise<IGroup>
}
