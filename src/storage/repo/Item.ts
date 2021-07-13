import { IItem } from "../../models/Item"

export interface IItemAllResponse {
    payloads: IItem[]
    count: number
}

export interface ItemRepo {
    create(payload: IItem): Promise<IItem>
    update(query: Object, payload: IItem): Promise<IItem>
    delete(query: Object): Promise<any>
    find(query: Object): Promise<IItem[]>
    findOne(query: Object): Promise<IItem>
    findById(id: string): Promise<IItem>
}
