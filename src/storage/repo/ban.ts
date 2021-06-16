import { IBan } from '../../models/Ban'

export interface IBanAllResponse {
    payloads: IBan[]
    count: number
}

export interface BanRepo {
    create(payload: IBan): Promise<IBan>
    findOne(query: Object): Promise<IBan | null>
}
