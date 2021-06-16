import config from '../config/config'
import jwt from 'jsonwebtoken'

type DecodedToken = {
    user_id: string
    session_id: string
    iat: number
}

export const signToken = async (user_id: string, session_id: string): Promise<String> => {
    return jwt.sign({ user_id, session_id }, config.JwtSecret, {
        expiresIn: config.JwtExpireIn
    })
}

export const decodeToken = async (token: string): Promise<DecodedToken> => {
    const decoded = (await jwt.verify(token, config.JwtSecret)) as DecodedToken

    return decoded
}
