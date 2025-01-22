import { ExceptionFilter, Catch, ArgumentsHost, HttpException, UnauthorizedException } from '@nestjs/common'
import { Response } from 'express'
import { returnInfo, returnInfos, returnJson } from './ErrorMessages'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const status = 500 // 예외가 상태 코드를 설정하지 않으면 500 사용
    // 에러 메시지 추출
    if (exception instanceof UnauthorizedException) {
      return new JwtExceptionFilter().catch(exception, host)
    }
    const message =
      exception instanceof HttpException
        ? (exception.getResponse() as any)?.message || exception.message
        : exception instanceof Error
          ? exception.message
          : '알 수 없는 에러가 발생했습니다.'
    const returnJson = { ...returnInfos.BackEnd.json, data: message }
    response.status(status).json(returnJson)
  }
}

export class CustomException extends HttpException {
  constructor(returnInfo: returnInfo, data?: any) {
    const responseJson = { ...returnInfo.json }
    if (data) {
      responseJson.data = data
    }
    super(responseJson, returnInfo.statusCode)
  }
}

@Catch(CustomException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: CustomException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    const status = exception.getStatus()
    const returnJson = exception.getResponse() as returnJson

    response.status(status).json(returnJson)
  }
}

@Catch(UnauthorizedException)
export class JwtExceptionFilter implements ExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const context = host.switchToHttp()
    const response = context.getResponse<Response>()

    const returnJson = { ...returnInfos.JwtAuth.json }
    response.status(returnInfos.JwtAuth.statusCode).json(returnJson)
  }
}
