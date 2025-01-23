import { Controller, Post, Body, Get } from '@nestjs/common'
import { StudentService } from './student.service'

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  create(@Body() data: any) {
    return this.studentService.create(data)
  }

  @Get()
  list(@Body() data: any) {
    return data
  }
}
