import { Controller, Post, Body, Get, Request, Query } from '@nestjs/common'
import { ClassesService } from './classes.service'
import { ClassesEnrollDto, ClassesEnrollFilterDto, ClassesFilterDto } from './classes.dto'
import { JwtPayload } from 'src/common/auth/jwt.strategy'
import { ListDto } from 'src/common/paginateInfo.dto'

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Post()
  create(@Body() data: any) {
    return this.classesService.create(data)
  }

  @Get()
  list(@Request() req: any, @Query() filter: ClassesFilterDto) {
    const user: JwtPayload = req.user
    filter.company_idx = user.company_idx
    return this.classesService.classesList(filter)
  }

  @Get('/name')
  nameList(@Request() req: any, @Query() filter: ListDto) {
    const user: JwtPayload = req.user
    filter.company_idx = user.company_idx
    return this.classesService.nameList(filter)
  }

  @Post('/enroll')
  enroll(@Request() req: any, @Body() dto: ClassesEnrollDto) {
    const user: JwtPayload = req.user
    dto.company_idx = user.company_idx
    return this.classesService.enroll(dto)
  }

  @Get('/enroll')
  enrollList(@Request() req: any, @Query() filter: ClassesEnrollFilterDto) {
    const user: JwtPayload = req.user
    filter.company_idx = user.company_idx
    return this.classesService.enrollList(filter)
  }
}
