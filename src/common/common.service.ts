import { JwtPayload } from 'src/common/auth/jwt.strategy'
import { us_level } from 'src/user/user.dto'

export const successJson = (message: string, data?: any, code?: number) => {
  return {
    message: message,
    code: code ?? 1,
    data: data ?? data,
  }
}

export const checkManger = (user: JwtPayload) => {
  return user.us_level == us_level.manager
}
