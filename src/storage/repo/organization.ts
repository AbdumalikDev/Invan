import { IOrganization } from '../../models/Organization'

export interface IOrganizationAllResponse {
    payloads: IOrganization[]
    count: number
}

export interface OrganizationRepo {
    create(payload: IOrganization): Promise<IOrganization>
    findOne(query: Object): Promise<IOrganization>
    orgExist(query: Object): Promise<boolean>
}
