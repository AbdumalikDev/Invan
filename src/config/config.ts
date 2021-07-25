import dotenv from 'dotenv'

dotenv.config()

interface Config {
    HttpPort: string
    MongoHost: string
    MongoPort: number
    MongoDatabase: string
    MongoPassword: string
    MongoUser: string
    MongoAuthDisable: boolean
    JwtSecret: string
    NodeEnv: string
}

let config: Config = {
    HttpPort: getConf('PORT', '3005'),
    MongoHost: getConf('MONGO_HOST', 'localhost'),
    MongoPort: parseInt(getConf('MONGO_PORT', '27017')),
    MongoDatabase: getConf('MONGO_DATABASE', 'invan_myproject'),
    MongoPassword: getConf('MONGO_PASSWORD', ''),
    MongoUser: getConf('MONGO_USER', ''),
    MongoAuthDisable: false,
    JwtSecret: getConf('JWT_SECRET', 'mySecret'),
    NodeEnv: getConf('NODE_ENV', 'production')
}

function getConf(name: string, def: string = ''): string {
    if (process.env[name]) {
        return process.env[name] || ''
    }
    return def
}

export default config
