import { IEmployee } from '../../models/Employee'

export interface IEmployeeAllResponse {
    payloads: IEmployee[]
    count: number
}

export interface EmployeeRepo {
    create(payload: IEmployee): Promise<IEmployee>
    findOne(query: Object): Promise<IEmployee>
    userExist(query: Object): Promise<boolean>
    update(query: Object, payload: Object): Promise<IEmployee>
    findAndPopulate(query: Object): Promise<IEmployee>
    findAllandPopulate(query: Object): Promise<IEmployee[]>
}
