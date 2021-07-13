import { ICategory } from '../../models/Category'

export interface ICategoryAllResponse {
    payloads: ICategory[]
    count: number
}

export interface CategoryRepo {
    create(payload: ICategory): Promise<ICategory>
    update(query: Object, payload: ICategory): Promise<ICategory>
    delete(query: Object): Promise<string>
    find(query: Object): Promise<ICategory[]>
    findById(id: string): Promise<ICategory>
}
