import { Controller, Post, Body, Get, Request, Query, Put } from '@nestjs/common'
import { ShuttleService } from './shuttle.service'
import {
  CarFilterDto,
  CreateShuttleDto,
  EnterDriverDto,
  ReservationStudentFilterDto,
  ShuttleFilterDto,
  ShuttleMatchFilterDto,
  ShuttleReservationDto,
} from './shuttle.dto'
import { JwtPayload } from 'src/common/auth/jwt.strategy'

@Controller('shuttle')
export class ShuttleController {
  constructor(private readonly shuttleService: ShuttleService) {}

  // 차량 등록
  @Post()
  createShuttle(@Request() req: any, @Body() dto: CreateShuttleDto) {
    const user: JwtPayload = req.user
    dto.company_idx = user.company_idx
    return this.shuttleService.createShuttle(dto)
  }

  // 등록된 차량 목록
  @Get('/car')
  carList(@Request() req: any, @Query() filter: CarFilterDto) {
    const user: JwtPayload = req.user
    filter.company_idx = user.company_idx
    return this.shuttleService.carList(filter)
  }

  // 차량 기사 배정
  @Put('/driver')
  enterDriver(@Request() req: any, @Body() dto: EnterDriverDto) {
    const user: JwtPayload = req.user
    dto.company_idx = user.company_idx
    return this.shuttleService.enterDriver(dto)
  }

  // 셔틀 목록
  @Get()
  shuttleList(@Request() req: any, @Query() filter: ShuttleFilterDto) {
    const user: JwtPayload = req.user
    filter.company_idx = user.company_idx
    return this.shuttleService.shuttleList(filter)
  }

  // 셔틀 예약
  @Post('/reservation')
  shuttleReservation(@Request() req: any, @Body() dto: ShuttleReservationDto) {
    const user: JwtPayload = req.user
    dto.company_idx = user.company_idx
    return this.shuttleService.shuttleReservation(dto)
  }

  // 셔틀별 예약 학생 목록
  @Get('/reservation/student')
  shuttleReservationStudentList(@Request() req: any, @Query() filter: ReservationStudentFilterDto) {
    const user: JwtPayload = req.user
    filter.company_idx = user.company_idx
    filter.us_idx = user.us_idx
    return this.shuttleService.shuttleReservationStudentList(filter)
  }

  // 학생에게 맞는 셔틀 목록
  @Get('/match')
  shuttleMatchList(@Request() req: any, @Query() filter: ShuttleMatchFilterDto) {
    const user: JwtPayload = req.user
    filter.company_idx = user.company_idx
    return this.shuttleService.shuttleMatchList(filter)
  }
}
