import { IAudit } from '../../models/Audit'

export interface IAuditAllResponse {
    payloads: IAudit[]
    count: number
}

export interface AuditRepo {
    create(payload: IAudit): Promise<IAudit>
    find(query: Object): Promise<IAudit[]>
    findAndPopulate(query: Object): Promise<IAudit[]>
}
