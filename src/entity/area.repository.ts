import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Area } from './area.entity'
import { AreaFilterDto } from 'src/common/simpleList/simpleList.dto'
import { getListData } from 'src/common/common.service'

export class AreaRepository {
  constructor(
    @InjectRepository(Area)
    private readonly repository: Repository<Area>, // Repository를 직접 주입받음
  ) {}

  async findManyByFilters(filter: AreaFilterDto) {
    const query = this.repository.createQueryBuilder('ar')
    // where 문
    if (filter.company_idx) {
      query.andWhere('ar.company_idx = :company_idx', { company_idx: filter.company_idx })
    }
    if (filter.ar_name) {
      query.andWhere('ar.ar_name LIKE :name', { name: `%${filter.ar_name}%` })
    }
    // listData
    return await getListData(query, filter)
  }

  async findByArIdxAndCompanyIdx(ar_idx: number, company_idx: number): Promise<Area | null> {
    return this.repository.findOne({ where: { ar_idx, company_idx } })
  }
}
