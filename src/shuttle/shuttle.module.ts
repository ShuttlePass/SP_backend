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
import { User } from 'src/user/user.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Shuttle,
      ShuttleArea,
      ShuttleReservation,
      ShuttleTime,
      ShuttleReservationEnrollment,
      User,
    ]),
    AuthModule,
  ],
  controllers: [ShuttleController],
  providers: [ShuttleService, ShuttleRepository],
})
export class ShuttleModule {}
