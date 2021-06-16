import { ISmsAuth } from "../../models/SmsAuth"

export interface ISmsAuthAllResponse {
    payloads: ISmsAuth[]
    count: number
}

export interface SmsAuthRepo {
    create(payload: ISmsAuth): Promise<ISmsAuth>
    findOne(query: Object): Promise<ISmsAuth>
}
