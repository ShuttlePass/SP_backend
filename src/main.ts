import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // ValidationPipe 설정
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // DTO 객체로 변환
    whitelist: true, // 유효하지 않은 속성 필터링
    forbidNonWhitelisted: true, // 화이트리스트에 없는 속성이 있으면 예외 발생
  }));

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
