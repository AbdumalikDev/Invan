import { IGroupWarehouse } from '../../models/Group_wearhouse';

export interface IGroupWarehouseAllResponse {
    payloads: IGroupWarehouse[]
    count: number
}

export interface GroupWarehouseRepo {
    create(payload: IGroupWarehouse): Promise<IGroupWarehouse>
    update(query: Object, payload: IGroupWarehouse): Promise<IGroupWarehouse>
    delete(query: Object): Promise<IGroupWarehouse>
    findAndPopulate(query: Object): Promise<IGroupWarehouse>
    findOne(query: Object): Promise<IGroupWarehouse>
}
