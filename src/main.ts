import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AllExceptionsFilter, CustomExceptionFilter } from './common/exception/ExceptionFilter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // cors 설정
  app.enableCors({
    origin: 'http://52.78.63.46', // 허용할 출처 (프론트엔드 URL)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 허용할 HTTP 메서드
    credentials: true, // 쿠키 등 인증정보 허용 시
  })
  // Swagger 설정
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The API description')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api-docs', app, document)
  // Exception 설정
  app.useGlobalFilters(new AllExceptionsFilter(), new CustomExceptionFilter())
  // ValidationPipe 설정
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // DTO 객체로 변환
      whitelist: true, // 유효하지 않은 속성 필터링
      forbidNonWhitelisted: true, // 화이트리스트에 없는 속성이 있으면 예외 발생
    }),
  )

  await app.listen(3000, '0.0.0.0')
}
bootstrap()
