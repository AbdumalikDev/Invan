import { ICategory } from '../../models/Category'

export interface ICategoryAllResponse {
    payloads: ICategory[]
    count: number
}

export interface CategoryRepo {
    create(payload: ICategory): Promise<ICategory>
    update(id: string, payload: ICategory): Promise<ICategory>
    find(query: Object): Promise<ICategory[]>
    findById(id: string): Promise<ICategory>
}
