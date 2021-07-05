import { IProduct } from '../../models/Product'

export interface IProductAllResponse {
    payloads: IProduct[]
    count: number
}

export interface ProductRepo {
    create(payload: IProduct): Promise<IProduct>
    update(id: string, payload: IProduct): Promise<IProduct>
    delete(id: string): Promise<string>
    find(query: Object): Promise<IProduct[]>
    findById(id: string): Promise<IProduct>
}
