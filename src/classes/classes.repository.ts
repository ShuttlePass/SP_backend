import { Classes } from './classes.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { EntityManager, Repository } from 'typeorm'
import {
  ClassesEnrollDto,
  ClassesEnrollFilterDto,
  ClassesFilterDto,
  CreateClassesDto,
  CreateClassesNameDto,
} from './classes.dto'
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

  async enrollStudent(dto: ClassesEnrollDto) {
    const enrollment = this.classesEnrollmentRepository.create(dto)
    return this.classesEnrollmentRepository.save(enrollment)
  }

  async nameCreate(dto: CreateClassesNameDto) {
    const classesName = this.classesNameRepository.create(dto)
    return this.classesNameRepository.save(classesName)
  }

  async classesCreate(dto: CreateClassesDto, manager: EntityManager) {
    const classes = manager.create(Classes, {
      classes_name_idx: dto.classes_name_idx,
      cl_start_at: dto.cl_start_at,
      cl_end_at: dto.cl_end_at,
    })
    return manager.save(classes)
  }

  async classesDayCreate(dto: CreateClassesDto, classes_idx: number, manager: EntityManager) {
    const newClassesDays = dto.cd_days.map((cd_day) => ({
      cd_day: cd_day,
      classes_idx: classes_idx,
    }))
    return manager.save(ClassesDay, newClassesDays)
  }

  async findClassesName(filter: ListDto) {
    return this.classesNameRepository.find({
      where: {
        company_idx: filter.company_idx, // 원하는 조건 추가
      },
    })
  }

  async chkClassesTime(classesIdx: number, studentIdx: number, ceDate: string) {
    const classInfo = await this.classesRepository.findOne({
      where: {
        cl_idx: classesIdx,
      },
    })
    if (!classInfo) {
      throw new CustomException(returnInfos.BadRequest)
    }

    // 'classes_enrollment', 'classes_day', 'classes' 테이블을 조인하여 날짜 범위가 겹치는지 확인
    const enrollment = await this.classesEnrollmentRepository
      .createQueryBuilder('ce')
      .innerJoin(ClassesDay, 'cd', 'ce.classes_day_idx = cd.cd_idx')
      .innerJoin(Classes, 'cl', 'cd.classes_idx = cl.cl_idx')
      .where('ce.student_idx = :studentIdx', { studentIdx })
      .andWhere('ce.ce_date = :ceDate', { ceDate })
      .andWhere('cl.cl_start_at <= :endAt', { endAt: classInfo.cl_end_at })
      .andWhere('cl.cl_end_at >= :startAt', { startAt: classInfo.cl_start_at })
      .getOne()
    return enrollment
  }

  async findOneClassesDayByCompanyIdxAndCdIdx(companyIdx: number, classes_day_idx: number) {
    return this.classesDayRepository
      .createQueryBuilder('cd')
      .innerJoin(Classes, 'cl', 'cl.cl_idx = cd.classes_idx')
      .innerJoin(ClassesName, 'cn', 'cn.cn_idx = cl.classes_name_idx')
      .where('cn.company_idx = :company_idx', { company_idx: companyIdx })
      .where('cd.cd_idx = :cd_idx', { cd_idx: classes_day_idx })
      .getOne()
  }

  async findClassesEnrollByCeDateAndStudentIdx(sr_meet_date: string, student_idx: number) {
    return this.classesEnrollmentRepository.findOne({ where: { student_idx, ce_date: sr_meet_date } })
  }

  async findClassesByFilters(filter: ClassesFilterDto) {
    const query = this.classesRepository
      .createQueryBuilder('cl')
      .innerJoin(ClassesName, 'cn', 'cl.classes_name_idx = cn.cn_idx')
      .innerJoin(ClassesDay, 'cd', 'cd.classes_idx = cl.cl_idx')
      .select([
        'cl.cl_idx AS classes_idx',
        'cn.cn_max_num AS cn_max_num',
        'cl.cl_start_at AS cl_start_at',
        'cl.cl_end_at AS cl_end_at',
        'cl.created_at AS created_at',
        'cl.updated_at AS updated_at',
        'cn.cn_name AS cn_name',
        'cn.cn_idx AS cn_idx',
        'GROUP_CONCAT(cd.cd_day) AS cd_days',
        'cd.cd_idx AS cd_idx',
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

  async findClassesEnrollByFilters(filter: ClassesEnrollFilterDto) {
    const query = this.classesEnrollmentRepository
      .createQueryBuilder('ce')
      .innerJoin(ClassesDay, 'cd', 'ce.classes_day_idx = cd.cd_idx')
      .innerJoin(Classes, 'cl', 'cl.cl_idx = cd.classes_idx')
      .innerJoin(ClassesName, 'cn', 'cl.classes_name_idx = cn.cn_idx')
      .select([
        'ce.ce_idx AS ce_idx',
        'ce.student_idx AS student_idx',
        'ce.ce_date AS ce_date',
        'ce.classes_day_idx AS classes_day_idx',
        'ce.created_at AS created_at',
        'ce.updated_at AS updated_at',
        'cd.classes_idx AS classes_idx',
        'cd.cd_day AS cd_day',
        'cn.cn_max_num AS cn_max_num',
        'cl.cl_start_at AS cl_start_at',
        'cl.cl_end_at AS cl_end_at',
        'cn.cn_idx AS cn_idx',
        'cn.cn_name AS cn_name',
      ])
    if (filter.company_idx) {
      query.andWhere('cn.company_idx = :company_idx', { company_idx: filter.company_idx })
    }
    if (filter.student_idx) {
      query.andWhere('ce.student_idx = :student_idx', { student_idx: filter.student_idx })
    }
    if (filter.ce_date) {
      query.andWhere('ce.ce_date = :ce_date', { ce_date: filter.ce_date })
    }
    if (filter.cn_idx) {
      query.andWhere('cn.cn_idx = :cn_idx', { cn_idx: filter.cn_idx })
    }
    if (filter.order == 'created_at') {
      query.orderBy('ce.created_at', filter.dir)
    } else if (filter.order == 'cn_name') {
      query.orderBy('cn.cn_name', filter.dir)
    } else if (filter.order == 'class_at') {
      query.orderBy('ce.ce_date', filter.dir)
      query.addOrderBy('cl.cl_start_at', filter.dir)
    } else {
      throw new CustomException(returnInfos.BadRequest, '등록되지 않은 order -> 추가 문의해주세요!')
    }
    // listData
    return await getListData(query, filter)
  }

  async parseClassesNum(data: any, ce_date: Date) {
    // 1. cd_idx 값만 추출
    const cdIdxs = data.map((classes: any) => classes.cd_idx)
    const classesNum = await this.classesEnrollmentRepository
      .createQueryBuilder('ce')
      .select(['ce.classes_day_idx AS cd_idx, COUNT(*) AS cnt'])
      .where('ce.classes_day_idx IN (:...cdIdxs)', { cdIdxs })
      .where('ce.ce_date = :ce_date', { ce_date })
      .groupBy('ce.classes_day_idx')
      .getRawMany()

    const countMap = new Map(classesNum.map((item) => [item.cd_idx, item.cnt]))
    const updatedData = data.map((item: any) => ({
      ...item,
      count: countMap.get(item.cd_idx) || 0, // count가 없으면 기본값 0
    }))
    return updatedData
  }
}
