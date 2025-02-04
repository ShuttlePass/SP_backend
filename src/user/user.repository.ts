import { User } from './user.entity'
import { CreateUserDto } from './user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Company } from 'src/entity/company.entity'

export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>, // Repository를 직접 주입받음
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>, // Repository를 직접 주입받음
  ) {}

  async createUser(userData: CreateUserDto): Promise<User> {
    const user = this.repository.create(userData)
    return this.repository.save(user)
  }

  async findOneUserById(us_id: string): Promise<User | null> {
    return this.repository.findOne({ where: { us_id } })
  }

  async findOneUserByIdx(us_idx: number): Promise<User | null> {
    return this.repository.findOne({ where: { us_idx } })
  }

  async findByName(us_name: string): Promise<User[]> {
    return this.repository.createQueryBuilder('user').where('user.us_name = :us_name', { us_name }).getMany()
  }

  async findOneCompanyByIdx(co_idx: number): Promise<Company | null> {
    return this.companyRepository.findOne({ where: { co_idx } })
  }
}
