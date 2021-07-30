import { IShipment } from "../../models/Shipment"

export interface IShipmentAllResponse {
    payloads: IShipment[]
    count: number
}

export interface ShipmentRepo {
    create(payload: IShipment): Promise<IShipment>
    update(query: Object, payload: IShipment): Promise<IShipment>
    delete(query: Object): Promise<any>
    findAndPopulate(query: Object): Promise<IShipment>
    findOne(query: Object): Promise<IShipment>
    findById(id: string): Promise<IShipment>
}