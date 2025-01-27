import { Classes } from './classes.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ClassesFilterDto } from './classes.dto'

export class ClassesRepository {
  constructor(
    @InjectRepository(Classes)
    private readonly repository: Repository<Classes>, // Repository를 직접 주입받음
  ) {}

  async findManyByFilters(filter: ClassesFilterDto) {
    //   const query = this.repository
    //   .createQueryBuilder('cl')
    //   .innerJoin('')
    // }
    return { data: filter, pageInfo: filter }
  }
}
