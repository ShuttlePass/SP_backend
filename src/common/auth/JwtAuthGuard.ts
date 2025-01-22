import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport' // AuthGuard를 상속
import { IS_PUBLIC_KEY } from './SkipAuthDecorator'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private reflector: Reflector) {
    super()
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // `@SkipAuth`가 설정된 경로는 Guard를 스킵
    const isPublic = this.reflector.get<boolean>(IS_PUBLIC_KEY, context.getHandler())
    if (isPublic) {
      return true // `@SkipAuth`가 설정된 경로는 인증을 건너뛰고 true 반환
    }

    // JwtAuthGuard에서 AuthGuard의 기능을 호출해 JWT 토큰을 처리
    const result = await super.canActivate(context) // AuthGuard의 기본 로직 호출 후, 결과를 기다림
    return result as boolean // 최종적으로 boolean 값을 반환
  }
}
