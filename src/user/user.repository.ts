import { User } from './user.entity'
import { CreateUserDto, UserFilterDto } from './user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Company } from 'src/entity/company.entity'
import { getListData } from 'src/common/common.service'
import { Shuttle } from 'src/shuttle/shuttle.entity'

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

  async findByFilters(filter: UserFilterDto) {
    const query = this.repository
      .createQueryBuilder('us')
      .select([
        'us.us_idx as us_idx',
        'us.us_id as us_id',
        'us.us_level as us_level',
        'us.company_idx as company_idx',
        'us.us_contact as us_contact',
        'us.us_name as us_name',
        'sh.sh_idx as sh_idx',
      ])
      .leftJoin(Shuttle, 'sh', 'sh.driver_idx = us.us_idx AND sh.sh_state IN(1,2)')
    // where 문
    if (filter.company_idx) {
      query.andWhere('us.company_idx = :company_idx', { company_idx: filter.company_idx })
    }
    if (filter.us_idx) {
      query.andWhere('us.us_idx = :us_idx', { us_idx: filter.us_idx })
    }
    if (filter.us_level) {
      query.andWhere('us.us_level = :us_level', { us_level: filter.us_level })
    }
    if (filter.us_name) {
      query.andWhere('us.us_name LIKE :us_name', { us_name: `%${filter.us_name}%` })
    }
    if (filter.us_contact) {
      query.andWhere('us.us_contact LIKE :us_contact', { us_contact: `%${filter.us_contact}%` })
    }
    // order 문
    if (filter.order == 'created_at') {
      query.orderBy('us.created_at', filter.dir)
    }
    // listData
    return await getListData(query, filter)
  }
}
