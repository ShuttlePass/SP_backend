import { Classes } from './classes.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

export class ClassesRepository {
  constructor(
    @InjectRepository(Classes)
    private readonly repository: Repository<Classes>, // Repository를 직접 주입받음
  ) {}
}
