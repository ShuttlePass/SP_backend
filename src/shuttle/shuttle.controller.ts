import { Controller, Post, Body, Get, Request, Query } from '@nestjs/common'
import { ShuttleService } from './shuttle.service'
import { CarFilterDto } from './shuttle.dto'
import { JwtPayload } from 'src/common/auth/jwt.strategy'

@Controller('shuttle')
export class ShuttleController {
  constructor(private readonly shuttleService: ShuttleService) {}

  @Get('/car')
  carList(@Request() req: any, @Query() filter: CarFilterDto) {
    const user: JwtPayload = req.user
    filter.company_idx = user.company_idx
    return this.shuttleService.carList(filter)
  }

  // 차량 등록
  // 차량 기사 배정

  @Post()
  create(@Body() data: any) {
    return this.shuttleService.create(data)
  }

  @Get()
  list(@Body() data: any) {
    return data
  }
}
