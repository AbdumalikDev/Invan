import { IAttempt } from '../../models/Attempt'

export interface IAttemptAllResponse {
    payloads: IAttempt[]
    count: number
}

export interface AttemptRepo {
    create(payload: IAttempt): Promise<IAttempt>
    findOne(query: Object): Promise<IAttempt | null>
    update(query: Object, payload: IAttempt): Promise<IAttempt>
    delete(query: Object): Promise<string>
}
