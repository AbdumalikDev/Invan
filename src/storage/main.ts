import { SampleStorage } from './mongo/sample'
import { UserStorage } from './mongo/user'
import { SmsAuthStorage } from './mongo/smsAuth'
import { AttemptStorage } from './mongo/attempt'
import { BanStorage } from './mongo/ban'

interface IStorage {
    sample: SampleStorage
    user: UserStorage
    smsAuth: SmsAuthStorage
    attempt: AttemptStorage
    ban: BanStorage
}

export let storage: IStorage = {
    sample: new SampleStorage(),
    user: new UserStorage(),
    smsAuth: new SmsAuthStorage(),
    attempt: new AttemptStorage(),
    ban: new BanStorage()
}
