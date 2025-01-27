import { Controller, Query, Get, Request } from '@nestjs/common'
import { SimpleListService } from './simpleList.service'
import { SkipAuth } from 'src/common/auth/SkipAuthDecorator'
import { JwtPayload } from '../auth/jwt.strategy'
import { AreaFilterDto } from './simpleList.dto'
import { ListDto } from '../paginateInfo.dto'

@Controller('list')
export class SimpleListController {
  constructor(private readonly simpleListService: SimpleListService) {}

  @SkipAuth()
  @Get('/company')
  companyList(@Query() filter: ListDto) {
    return this.simpleListService.companyList(filter)
  }

  @Get('/area')
  areaList(@Request() req: any, @Query() filter: AreaFilterDto) {
    const user: JwtPayload = req.user
    return this.simpleListService.areaList(user, filter)
  }
}
