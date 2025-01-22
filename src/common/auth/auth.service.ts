import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from './jwt.strategy'
import { User } from 'src/user/user.entity'

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  // 사용자 인증 후 JWT 토큰 발급
  async encodeToken(user: User) {
    const payload: JwtPayload = { us_idx: user.us_idx, company_idx: user.company_idx, us_level: user.us_level }
    const accessToken = this.jwtService.sign(payload)
    return accessToken
  }
}
