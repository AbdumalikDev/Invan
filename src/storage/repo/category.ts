import { ICategory } from '../../models/Category'

export interface ICategoryAllResponse {
    payloads: ICategory[]
    count: number
}

export interface CategoryRepo {
    create(payload: ICategory): Promise<ICategory>
    update(query: Object, payload: ICategory | Object): Promise<ICategory>
    deleteMany(query: Object): Promise<string>
    find(query: Object): Promise<any>
    findOne(query: Object): Promise<ICategory>
}
