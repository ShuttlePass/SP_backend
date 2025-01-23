import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Area } from './area.entity'
import { AreaFilterDto } from 'src/common/simpleList/simpleList.dto'

export class AreaRepository {
  constructor(
    @InjectRepository(Area)
    private readonly repository: Repository<Area>, // Repository를 직접 주입받음
  ) {}

  async findByCompanyIdx(filter: AreaFilterDto) {
    const query = this.repository.createQueryBuilder('ar')
    if (filter.company_idx) {
      query.andWhere('ar.company_idx = :company_idx', { company_idx: filter.company_idx })
    }
    if (filter.ar_name) {
      query.andWhere('ar.ar_name LIKE :name', { name: `%${filter.ar_name}%` })
    }
    return await query.getMany()
  }
}
