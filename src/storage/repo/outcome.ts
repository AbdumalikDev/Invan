import { IOutcome } from '../../models/Outcome'

export interface IOutcomeAllResponse {
    payloads: IOutcome[]
    count: number
}

export interface OutcomeRepo {
    create(payload: IOutcome): Promise<IOutcome>
    update(query: Object, payload: IOutcome): Promise<IOutcome>
    delete(query: Object): Promise<string>
    find(query: Object): Promise<IOutcome[]>
    findOne(query: Object): Promise<IOutcome>
}
