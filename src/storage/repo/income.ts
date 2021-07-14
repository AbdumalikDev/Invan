import { IIncome } from "../../models/Income"

export interface IIncomeAllResponse {
    payloads: IIncome[]
    count: number
}

export interface IncomeRepo {
    create(payload: IIncome): Promise<IIncome>
    update(query: Object, payload: IIncome): Promise<IIncome>
    delete(query: Object): Promise<any>
    find(query: Object): Promise<IIncome[]>
    findOne(query: Object): Promise<IIncome>
    findById(id: string): Promise<IIncome>
}
