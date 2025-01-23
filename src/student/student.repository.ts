import { Student } from './student.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

export class StudentRepository {
  constructor(
    @InjectRepository(Student)
    private readonly repository: Repository<Student>, // Repository를 직접 주입받음
  ) {}
}
