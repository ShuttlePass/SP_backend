import { Controller, Query, Get, Request } from '@nestjs/common'
import { SimpleListService } from './simpleList.service'
import { SkipAuth } from 'src/common/auth/SkipAuthDecorator'
import { JwtPayload } from '../auth/jwt.strategy'
import { AreaFilterDto } from './simpleList.dto'

@Controller('list')
export class SimpleListController {
  constructor(private readonly simpleListService: SimpleListService) {}

  @SkipAuth()
  @Get('/company')
  companyList() {
    return this.simpleListService.companyList()
  }

  @Get('/area')
  areaList(@Request() req: any, @Query() filter: AreaFilterDto) {
    const user: JwtPayload = req.user
    return this.simpleListService.areaList(user, filter)
  }
}
