import { EmployeeStorage } from './mongo/employee'
import { SmsAuthStorage } from './mongo/smsAuth'
import { AttemptStorage } from './mongo/attempt'
import { BanStorage } from './mongo/ban'
import { OrganizationStorage } from './mongo/organization'
import { AuditStorage } from './mongo/audit'
import { ProductStorage } from './mongo/product'
import { UnitStorage } from './mongo/unit'
import { CategoryStorage } from './mongo/category'
import { ReceiptStorage } from './mongo/receipt'

interface IStorage {
    employee: EmployeeStorage
    smsAuth: SmsAuthStorage
    attempt: AttemptStorage
    ban: BanStorage
    org: OrganizationStorage
    audit: AuditStorage
    product: ProductStorage
    unit: UnitStorage
    category: CategoryStorage
    receipt: ReceiptStorage
}

export let storage: IStorage = {
    employee: new EmployeeStorage(),
    smsAuth: new SmsAuthStorage(),
    attempt: new AttemptStorage(),
    ban: new BanStorage(),
    org: new OrganizationStorage(),
    audit: new AuditStorage(),
    product: new ProductStorage(),
    unit: new UnitStorage(),
    category: new CategoryStorage(),
    receipt: new ReceiptStorage()
}
