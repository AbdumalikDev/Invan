import { IReceipt } from '../../models/Receipt'

export interface IReceiptAllResponse {
    payloads: IReceipt[]
    count: number
}

export interface ReceiptRepo {
    create(payload: IReceipt): Promise<IReceipt>
    update(query: Object, payload: IReceipt): Promise<IReceipt>
    delete(query: Object): Promise<string>
    find(query: Object): Promise<IReceipt[]>
}
