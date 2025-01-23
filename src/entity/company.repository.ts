import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Company } from './company.entity'

export class CompanyRepository {
  constructor(
    @InjectRepository(Company)
    private readonly repository: Repository<Company>, // Repository를 직접 주입받음
  ) {}

  async getAll(): Promise<Company[]> {
    return this.repository.find()
  }
}
