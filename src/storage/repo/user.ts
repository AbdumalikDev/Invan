import { IUser } from '../../models/User'

export interface IUserAllResponse {
    payloads: IUser[]
    count: number
}

export interface UserRepo {
    create(payload: IUser): Promise<IUser>
    findOne(query: Object): Promise<IUser>
    userExist(query: Object): Promise<boolean>
}
