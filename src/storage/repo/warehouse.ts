import { IWarehouse } from "../../models/Warehouse"

export interface IWarehouseAllResponse {
    payloads: IWarehouse[]
    count: number
}

export interface WarehouseRepo {
    create(payload: IWarehouse): Promise<IWarehouse>
    update(query: Object, payload: IWarehouse): Promise<IWarehouse>
    delete(query: Object): Promise<any>
    find(query: Object): Promise<IWarehouse[]>
    findOne(query: Object): Promise<IWarehouse>
    findById(id: string): Promise<IWarehouse>
}
