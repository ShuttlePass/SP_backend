import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Company } from './company.entity'
import { ListDto } from 'src/common/paginateInfo.dto'
import { getListData } from 'src/common/common.service'

export class CompanyRepository {
  constructor(
    @InjectRepository(Company)
    private readonly repository: Repository<Company>, // Repository를 직접 주입받음
  ) {}

  async findBy(filter: ListDto) {
    const query = this.repository
      .createQueryBuilder('co')
      .select([
        'co.co_idx as co_idx',
        'co.co_name as co_name',
        'co.created_at as created_at',
        'co.updated_at as updated_at',
      ])
    return await getListData(query, filter)
  }
}
