import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // Swagger 설정
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The API description')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api-docs', app, document)
  // ValidationPipe 설정
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // DTO 객체로 변환
      whitelist: true, // 유효하지 않은 속성 필터링
      forbidNonWhitelisted: true, // 화이트리스트에 없는 속성이 있으면 예외 발생
    }),
  )

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
