import { Shuttle } from './shuttle.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CarFilterDto } from './shuttle.dto'
import { CustomException } from 'src/common/exception/ExceptionFilter'
import { returnInfos } from 'src/common/exception/ErrorMessages'
import { getListData } from 'src/common/common.service'
import { User } from 'src/user/user.entity'

export class ShuttleRepository {
  constructor(
    @InjectRepository(Shuttle)
    private readonly shuttleRepository: Repository<Shuttle>, // Repository를 직접 주입받음
  ) {}

  async findShuttleByFilters(filter: CarFilterDto) {
    const query = this.shuttleRepository
      .createQueryBuilder('sh')
      .leftJoin(User, 'us', 'sh.driver_idx = us.us_idx')
      .select([
        'sh.sh_name AS sh_name',
        'sh.sh_state AS sh_state',
        'sh.sh_max_cnt AS sh_max_cnt',
        'sh.sh_idx AS sh_idx',
        'us.us_idx AS us_idx',
        'us.us_name AS us_name',
        'us.us_contact AS us_contact',
      ])
    // where 문
    if (filter.company_idx) {
      query.andWhere('sh.company_idx = :company_idx', { company_idx: filter.company_idx })
    }
    if (filter.sh_idx) {
      query.andWhere('sh.sh_idx = :sh_idx', { sh_idx: filter.sh_idx })
    }
    // order 문
    if (filter.order == 'created_at') {
      query.orderBy('sh.created_at', filter.dir)
    } else if (filter.order == 'company_idx') {
      query.orderBy('sh.company_idx', filter.dir)
    } else if (filter.order == 'sh_name') {
      query.orderBy('sh.sh_name', filter.dir)
    } else {
      throw new CustomException(returnInfos.BadRequest, '등록되지 않은 order -> 추가 문의해주세요!')
    }
    // listData
    return await getListData(query, filter)
  }
}
