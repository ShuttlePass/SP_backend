import { Controller, Post, Body, Get, Request, Query } from '@nestjs/common'
import { ClassesService } from './classes.service'
import { ClassesFilterDto } from './classes.dto'
import { JwtPayload } from 'src/common/auth/jwt.strategy'

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Post()
  create(@Body() data: any) {
    return this.classesService.create(data)
  }

  // @Get()
  // list(@Request() req: any, @Query() filter: ClassesFilterDto) {
  //   const user: JwtPayload = req.user
  //   filter.company_idx = user.company_idx
  //   return this.classesService.list(filter)
  // }
}
