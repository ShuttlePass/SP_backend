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
import { Company } from './entity/company.entity'
import { ClassesDay } from './classes/classesDay.entity'
import { ClassesEnrollment } from './classes/classesEnrollment.entity'
import { ClassesName } from './classes/classesName.entity'
import { ShuttleModule } from './shuttle/shuttle.module'
import { Shuttle } from './shuttle/shuttle.entity'
import { ShuttleArea } from './shuttle/shuttleArea.entity'
import { ShuttleTime } from './shuttle/shuttleTime.entity'
import { ShuttleReservation } from './shuttle/shuttleReservation.entity'
import { ShuttleReservationEnrollment } from './shuttle/shuttleReservationEnrollment.entity'

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
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      timezone: 'Asia/Seoul',
      entities: [
        User,
        Area,
        Classes,
        Student,
        Company,
        ClassesDay,
        ClassesEnrollment,
        ClassesName,
        Shuttle,
        ShuttleArea,
        ShuttleTime,
        ShuttleReservation,
        ShuttleReservationEnrollment,
      ], //[__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
      logging: true,
      extra: {
        connectionLimit: 10,
        timezone: 'Asia/Seoul', // 세션 타임존 추가
      },
    }),
    UserModule,
    AuthModule,
    ClassesModule,
    StudentModule,
    SimpleListModule,
    ShuttleModule,
  ],
})
export class AppModule {}
