import { JwtPayload } from 'src/common/auth/jwt.strategy'

export const successJson = (message: string, data?: any, code?: number) => {
  return {
    message: message,
    code: code ?? 1,
    data: data ?? data,
  }
}

export const checkManger = (user: JwtPayload) => {
  return user.us_level == 'manager'
}
