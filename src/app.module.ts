import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module' // UserModule import
import { AuthModule } from './common/auth/AuthModule'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from './common/auth/JwtAuthGuard'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ClassesModule } from './classes/classes.module'
import { ConfigModule } from '@nestjs/config'
import { StudentModule } from './student/student.module'
import { SimpleListModule } from './common/simpleList/simpleList.module'
import { User } from './user/user.entity'
import { Area } from './entity/area.entity'
import { Classes } from './classes/classes.entity'
import { Student } from './student/student.entity'

//const entities = globSync('dist/**/*.entity.js') // .js 파일로 변경

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 환경 변수 전역 사용
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'shuttlepass-db.cekgoqjjacws.ap-northeast-1.rds.amazonaws.com', // process.env.DB_HOST,
      port: 3306, // parseInt(process.env.DB_PORT || '32402', 10),
      username: 'root', // process.env.DB_USERNAME,
      password: 'YpUlPRV5ZRWZoFMISLGX', // process.env.DB_PASSWORD,
      database: 'shuttle_pass', // process.env.DB_DATABASE,
      entities: [User, Area, Classes, Student], //[__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    UserModule,
    AuthModule,
    ClassesModule,
    StudentModule,
    SimpleListModule,
  ],
})
export class AppModule {}
