import { Module } from '@nestjs/common'
import { ShuttleController } from './shuttle.controller'
import { ShuttleService } from './shuttle.service'
import { ShuttleRepository } from './shuttle.repository'
import { Shuttle } from './shuttle.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from 'src/common/auth/AuthModule'
import { ShuttleArea } from './shuttleArea.entity'
import { ShuttleReservation } from './shuttleReservation.entity'
import { ShuttleTime } from './shuttleTime.entity'
import { ShuttleReservationEnrollment } from './shuttleReservationEnrollment.entity'
import { UserModule } from 'src/user/user.module'
import { ClassesEnrollment } from 'src/classes/classesEnrollment.entity'
import { ClassesModule } from 'src/classes/classes.module'
import { Student } from 'src/student/student.entity'
import { StudentModule } from 'src/student/student.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Shuttle,
      ShuttleArea,
      ShuttleReservation,
      ShuttleTime,
      ShuttleReservationEnrollment,
      ClassesEnrollment,
      Student,
    ]),
    AuthModule,
    UserModule,
    ClassesModule,
    StudentModule,
  ],
  controllers: [ShuttleController],
  providers: [ShuttleService, ShuttleRepository],
})
export class ShuttleModule {}
