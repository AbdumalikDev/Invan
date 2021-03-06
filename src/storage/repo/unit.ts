import { IUnit } from '../../models/Unit'

export interface IUnitAllResponse {
    payloads: IUnit[]
    count: number
}

export interface UnitRepo {
    create(payload: IUnit): Promise<IUnit>
    update(query: Object, payload: IUnit): Promise<IUnit>
    deleteMany(query: Object): Promise<string>
    find(query: Object): Promise<IUnit[]>
    findOne(query: Object): Promise<IUnit>
}
