import { Controller, Post, Body, Get } from '@nestjs/common'
import { ClassesService } from './classes.service'

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Post()
  create(@Body() data: any) {
    return this.classesService.create(data)
  }

  @Get()
  list(@Body() data: any) {
    return data
  }
}
