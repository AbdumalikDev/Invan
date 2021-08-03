import { IWarehouse } from '../../models/Warehouse'

export interface IWarehouseAllResponse {
    payloads: IWarehouse[]
    count: number
}

export interface WarehouseRepo {
    create(payload: IWarehouse): Promise<IWarehouse>
    update(query: Object, payload: IWarehouse | Object): Promise<IWarehouse>
    delete(query: Object): Promise<string>
    find(query: Object): Promise<IWarehouse[]>
    findOne(query: Object): Promise<IWarehouse>
}
