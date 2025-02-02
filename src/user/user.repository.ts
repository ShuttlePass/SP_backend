import { User } from './user.entity'
import { CreateUserDto } from './user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>, // Repository를 직접 주입받음
  ) {}

  async createUser(userData: CreateUserDto): Promise<User> {
    const user = this.repository.create(userData)
    return this.repository.save(user)
  }

  async findOneUserById(us_id: string): Promise<User | null> {
    return this.repository.findOne({ where: { us_id } })
  }

  async findByName(us_name: string): Promise<User[]> {
    return this.repository.createQueryBuilder('user').where('user.us_name = :us_name', { us_name }).getMany()
  }
}
