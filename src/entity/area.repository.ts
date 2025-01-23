import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Area } from './area.entity'

export class AreaRepository {
  constructor(
    @InjectRepository(Area)
    private readonly repository: Repository<Area>, // Repository를 직접 주입받음
  ) {}
}
