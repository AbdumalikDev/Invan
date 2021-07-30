import { EmployeeStorage } from './mongo/employee'
import { SmsAuthStorage } from './mongo/smsAuth'
import { AttemptStorage } from './mongo/attempt'
import { BanStorage } from './mongo/ban'
import { OrganizationStorage } from './mongo/organization'
import { AuditStorage } from './mongo/audit'
import { ProductStorage } from './mongo/product'
import { UnitStorage } from './mongo/unit'
import { CategoryStorage } from './mongo/category'
import { ItemStorage } from './mongo/item'
import { WarehouseStorage } from './mongo/warehouse'
import { ContractorStorage } from './mongo/contractor'
import { IncomeStorage } from './mongo/income'
import { ReceiptStorage } from './mongo/receipt'
import { ShipmentStorage } from './mongo/shipment'
import { OutcomeStorage } from './mongo/outcome'
import { GroupStorage } from './mongo/group'

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
    item: ItemStorage
    warehouse: WarehouseStorage
    contractor: ContractorStorage
    income: IncomeStorage
    receipt: ReceiptStorage
    shipment: ShipmentStorage
    outcome: OutcomeStorage
    group: GroupStorage
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
    item: new ItemStorage(),
    warehouse: new WarehouseStorage(),
    contractor: new ContractorStorage(),
    income: new IncomeStorage(),
    receipt: new ReceiptStorage(),
    shipment: new ShipmentStorage(),
    outcome: new OutcomeStorage(),
    group: new GroupStorage()
}
