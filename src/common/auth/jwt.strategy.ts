import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { us_level } from 'src/user/user.dto'

export interface JwtPayload {
  us_idx: number
  company_idx: number
  us_level: us_level
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 헤더에서 JWT 추출
      ignoreExpiration: false, // 만료된 JWT도 처리
      secretOrKey: 'shuttle-pass', // 비밀키 설정
    })
  }

  async validate(payload: JwtPayload) {
    // 페이로드에서 사용자 정보를 검증 후 반환
    return payload
  }
}
