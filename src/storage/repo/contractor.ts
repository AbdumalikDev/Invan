import { IContractor } from "../../models/Contractor"

export interface IContractorAllResponse {
    payloads: IContractor[]
    count: number
}

export interface ContractorRepo {
    create(payload: IContractor): Promise<IContractor>
    update(query: Object, payload: IContractor): Promise<IContractor>
    delete(query: Object): Promise<any>
    find(query: Object): Promise<IContractor[]>
    findOne(query: Object): Promise<IContractor>
    findById(id: string): Promise<IContractor>
}
