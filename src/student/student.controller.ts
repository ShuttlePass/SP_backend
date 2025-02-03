import { Controller, Post, Body, Get, Request, Query } from '@nestjs/common'
import { StudentService } from './student.service'
import { CreateStudentDto, HaveClassesStudentFilterDto, StudentFilterDto } from './student.dto'
import { JwtPayload } from 'src/common/auth/jwt.strategy'

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  create(@Request() req: any, @Body() createStudentDto: CreateStudentDto) {
    const user: JwtPayload = req.user
    return this.studentService.createStudent(createStudentDto, user)
  }

  @Get()
  list(@Request() req: any, @Query() filter: StudentFilterDto) {
    const user: JwtPayload = req.user
    filter.company_idx = user.company_idx
    return this.studentService.list(filter)
  }

  @Get('/haveclasses')
  haveClassesStudentList(@Request() req: any, @Query() filter: HaveClassesStudentFilterDto) {
    const user: JwtPayload = req.user
    filter.company_idx = user.company_idx
    return this.studentService.haveClassesStudentList(filter)
  }
}
