import { EmployeeStorage } from './mongo/employee'
import { SmsAuthStorage } from './mongo/smsAuth'
import { AttemptStorage } from './mongo/attempt'
import { BanStorage } from './mongo/ban'
import { OrganizationStorage } from './mongo/organization'
<<<<<<< HEAD
import { AuditStorage } from './mongo/audit'
import { ProductStorage } from './mongo/product'
import { UnitStorage } from './mongo/unit'
import { CategoryStorage } from './mongo/category'
=======
>>>>>>> mainsam

interface IStorage {
    employee: EmployeeStorage
    smsAuth: SmsAuthStorage
    attempt: AttemptStorage
    ban: BanStorage
    org: OrganizationStorage
<<<<<<< HEAD
    audit: AuditStorage
    product: ProductStorage
    unit: UnitStorage
    category: CategoryStorage
=======
>>>>>>> mainsam
}

export let storage: IStorage = {
    employee: new EmployeeStorage(),
    smsAuth: new SmsAuthStorage(),
    attempt: new AttemptStorage(),
    ban: new BanStorage(),
    org: new OrganizationStorage(),
<<<<<<< HEAD
    audit: new AuditStorage(),
    product: new ProductStorage(),
    unit: new UnitStorage(),
    category: new CategoryStorage()
=======
>>>>>>> mainsam
}
