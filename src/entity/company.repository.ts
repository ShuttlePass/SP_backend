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

  async getAll(filter: ListDto) {
    const query = this.repository.createQueryBuilder('co')
    return await getListData(query, filter)
  }
}
