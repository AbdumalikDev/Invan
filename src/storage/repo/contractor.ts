import { IContractor } from '../../models/Contractor'

export interface IContractorAllResponse {
    payloads: IContractor[]
    count: number
}

export interface ContractorRepo {
    create(payload: IContractor): Promise<IContractor>
    update(query: Object, payload: IContractor): Promise<IContractor>
    deleteMany(query: Object): Promise<string>
    find(query: Object): Promise<IContractor[]>
    findOne(query: Object): Promise<IContractor>
}
