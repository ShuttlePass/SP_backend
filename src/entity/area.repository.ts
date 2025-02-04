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

  async findByFilters(filter: AreaFilterDto) {
    const query = this.repository
      .createQueryBuilder('ar')
      .select([
        'ar.ar_idx as ar_idx',
        'ar.company_idx as company_idx',
        'ar.ar_name as ar_name',
        'ar.created_at as created_at',
        'ar.updated_at as updated_at',
      ])
    // where 문
    if (filter.company_idx) {
      query.andWhere('ar.company_idx = :company_idx', { company_idx: filter.company_idx })
    }
    if (filter.ar_name) {
      query.andWhere('ar.ar_name LIKE :name', { name: `%${filter.ar_name}%` })
    }
    if (filter.ar_idx_in) {
      query.andWhere('ar.ar_idx IN (:ar_idx_in)', { ar_idx_in: filter.ar_idx_in })
    }
    // listData
    return await getListData(query, filter)
  }

  async findOneByArIdxAndCompanyIdx(ar_idx: number, company_idx: number): Promise<Area | null> {
    return this.repository.findOne({ where: { ar_idx, company_idx } })
  }
}
