import { Classes } from './classes.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ClassesFilterDto } from './classes.dto'
import { ClassesName } from './classesName.entity'
import { ClassesDay } from './classesDay.entity'
import { ClassesEnrollment } from './classesEnrollment.entity'
import { ListDto } from 'src/common/paginateInfo.dto'
import { CustomException } from 'src/common/exception/ExceptionFilter'
import { returnInfos } from 'src/common/exception/ErrorMessages'
import { getListData } from 'src/common/common.service'

export class ClassesRepository {
  constructor(
    @InjectRepository(Classes)
    private readonly classesRepository: Repository<Classes>, // Repository를 직접 주입받음
    @InjectRepository(ClassesName)
    private readonly classesNameRepository: Repository<ClassesName>,
    @InjectRepository(ClassesDay)
    private readonly classesDayRepository: Repository<ClassesDay>,
    @InjectRepository(ClassesEnrollment)
    private readonly classesEnrollmentRepository: Repository<ClassesEnrollment>,
  ) {}

  async findClassesName(filter: ListDto) {
    return this.classesNameRepository.find({
      where: {
        company_idx: filter.company_idx, // 원하는 조건 추가
      },
    })
  }
  async findClassesByFilters(filter: ClassesFilterDto) {
    const query = this.classesRepository
      .createQueryBuilder('cl')
      .innerJoin(ClassesName, 'cn', 'cl.classes_name_idx = cn.cn_idx')
      .innerJoin(ClassesDay, 'cd', 'cd.classes_idx = cl.cl_idx')
      .select([
        'cl.cl_idx AS classes_idx',
        'cl.cl_max_num AS cl_max_num',
        'cl.cl_start_at AS cl_start_at',
        'cl.cl_end_at AS cl_end_at',
        'cl.created_at AS created_at',
        'cl.updated_at AS updated_at',
        'cn.cn_name AS cn_name',
        'cn.cn_idx AS cn_idx',
        'GROUP_CONCAT(cd.cd_day) AS cd_days',
      ])
      .groupBy('cl.cl_idx')
    if (filter.company_idx) {
      query.andWhere('cn.company_idx = :company_idx', { company_idx: filter.company_idx })
    }
    if (filter.cd_day) {
      query.andWhere('cd.cd_day = :cd_day', { cd_day: filter.cd_day })
    }
    if (filter.cn_idx) {
      query.andWhere('cn.cn_idx = :cn_idx', { cn_idx: filter.cn_idx })
    }
    if (filter.cn_name) {
      query.andWhere('cn.cn_name = :cn_name', { cn_name: filter.cn_name })
    }
    if (filter.order == 'created_at') {
      query.orderBy('cl.created_at', filter.dir)
    } else if (filter.order == 'cn_name') {
      query.orderBy('cn.cn_name', filter.dir)
    } else {
      throw new CustomException(returnInfos.BadRequest, '등록되지 않은 order -> 추가 문의해주세요!')
    }
    // listData
    return await getListData(query, filter)
  }
}
