import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module' // UserModule import
import { AuthModule } from './common/auth/AuthModule'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from './common/auth/JwtAuthGuard'
import { TypeOrmModule } from '@nestjs/typeorm'
import { globSync } from 'glob'
import { ClassesModule } from './classes/classes.module'

const entities = globSync('dist/**/*.entity.js') // .js 파일로 변경

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities,
      synchronize: false,
    }),
    UserModule,
    AuthModule,
    ClassesModule,
  ],
})
export class AppModule {}
