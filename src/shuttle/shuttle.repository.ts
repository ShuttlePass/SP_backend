import { Shuttle } from './shuttle.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { EntityManager, In, Not, Repository } from 'typeorm'
import {
  CarFilterDto,
  EnterDriverDto,
  ReservationStudentFilterDto,
  ShuttleFilterDto,
  ShuttleMatchFilterDto,
  ShuttleReservationDto,
  ShuttleReservationEntityDto,
} from './shuttle.dto'
import { CustomException } from 'src/common/exception/ExceptionFilter'
import { returnInfos } from 'src/common/exception/ErrorMessages'
import { getListData } from 'src/common/common.service'
import { User } from 'src/user/user.entity'
import { ShuttleArea } from './shuttleArea.entity'
import { Area } from 'src/entity/area.entity'
import { ShuttleTime } from './shuttleTime.entity'
import { ShuttleReservation } from './shuttleReservation.entity'
import { Company } from 'src/entity/company.entity'
import { Student } from 'src/student/student.entity'
import { ShuttleReservationEnrollment } from './shuttleReservationEnrollment.entity'
import { ClassesEnrollment } from 'src/classes/classesEnrollment.entity'

export class ShuttleRepository {
  constructor(
    @InjectRepository(Shuttle)
    private readonly shuttleRepository: Repository<Shuttle>, // Repository를 직접 주입받음
    @InjectRepository(ShuttleArea)
    private readonly shuttleAreaRepository: Repository<ShuttleArea>,
    @InjectRepository(ShuttleTime)
    private readonly shuttleTimeRepository: Repository<ShuttleTime>,
    @InjectRepository(ShuttleReservation)
    private readonly shuttleReservationRepository: Repository<ShuttleReservation>,
    @InjectRepository(ShuttleReservationEnrollment)
    private readonly shuttleReservationEnrollmentRepository: Repository<ShuttleReservationEnrollment>,
    @InjectRepository(ClassesEnrollment)
    private readonly classesEnrollmentRepository: Repository<ClassesEnrollment>,
  ) {}

  async updateShuttleDriver(dto: EnterDriverDto) {
    await this.shuttleRepository.update(
      { sh_idx: dto.sh_idx, company_idx: dto.company_idx, sh_state: Not(In([2, 3])) }, // 운행중, 삭제상태 안됨됨
      { driver_idx: dto.us_idx, sh_state: 1 },
    )
  }

  async createShuttleReservation(dto: ShuttleReservationDto, manager: EntityManager) {
    dto.sr_state = 0
    const srDto: ShuttleReservationEntityDto = { ...dto }
    const shuttleReservation = manager.create(ShuttleReservation, srDto)
    return manager.save(shuttleReservation)
  }

  async createShuttleReservationEnrollment(dto: ShuttleReservationDto, manager: EntityManager) {
    const classesEnrollments = await this.classesEnrollmentRepository.find({
      where: {
        student_idx: dto.student_idx,
        ce_date: dto.sr_meet_date,
        ce_idx: In(dto.classes_enrollment_idxs),
      },
    })
    if (classesEnrollments.length != dto.classes_enrollment_idxs.length) {
      throw new CustomException(returnInfos.BadRequest, 'classes_enrollment_idxs 잘못됨')
    }
    const sreInstance = dto.classes_enrollment_idxs.map((classes_enrollment_idx) => ({
      classes_enrollment_idx,
      shuttle_reservation_idx: dto.shuttle_reservation_idx,
    }))
    return manager.save(ShuttleReservationEnrollment, sreInstance)
  }

  async findOneByIdxs(dto: ShuttleReservationDto) {
    return await this.shuttleRepository
      .createQueryBuilder('sh')
      .innerJoin(Company, 'co', 'sh.company_idx = co.co_idx')
      .innerJoin(ShuttleTime, 'st', 'st.company_idx = co.co_idx')
      .innerJoin(Student, 'student', 'student.company_idx = co.co_idx')
      .where('co.co_idx = :company_idx', { company_idx: dto.company_idx })
      .andWhere('sh.sh_idx = :sh_idx', { sh_idx: dto.shuttle_idx })
      .andWhere('st.st_idx = :st_idx', { st_idx: dto.shuttle_time_idx })
      .andWhere('student.st_idx = :student_idx', { student_idx: dto.student_idx })
      .getOne()
  }

  async findShuttleByAreaIdx(filter: ShuttleMatchFilterDto) {
    return await this.shuttleRepository
      .createQueryBuilder('sh')
      .select([
        'sh.sh_name AS sh_name',
        'sh.sh_state AS sh_state',
        'sh.sh_max_cnt AS sh_max_cnt',
        'sh.sh_idx as shuttle_idx',
        'ar.ar_name as ar_name',
        'ar.ar_idx as area_idx',
      ])
      .innerJoin(ShuttleArea, 'sa', 'sa.shuttle_idx = sh.sh_idx')
      .innerJoin(Area, 'ar', 'sa.area_idx = ar.ar_idx')
      .where('sa.area_idx = :area_idx', { area_idx: filter.area_idx })
      .andWhere('sh.sh_state NOT IN(0,3)')
      .getRawMany()
  }

  async findShuttleReservationEnrollment(dto: ShuttleReservationDto) {
    return await this.shuttleReservationRepository.findOne({
      where: { shuttle_time_idx: dto.shuttle_time_idx, sr_meet_date: dto.sr_meet_date },
    })
  }

  async findOneByDriverIdx(us_idx: number, sh_idx: number) {
    return await this.shuttleRepository.findOne({
      where: { driver_idx: us_idx, sh_state: Not(4), sh_idx: Not(sh_idx) },
    })
  }

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

  async findByFilters(filter: ShuttleFilterDto) {
    let where: any = {
      company_idx: filter.company_idx,
      sh_state: In([1, 2]),
    }
    if (filter.sh_idx) {
      where = { ...where, sh_idx: filter.sh_idx }
    }
    const shuttles = await this.shuttleRepository.find({
      where,
    })

    const shIdxs = shuttles.map((shuttle) => shuttle.sh_idx)
    const query = this.shuttleTimeRepository
      .createQueryBuilder('st')
      .select([
        'st.st_idx as st_idx',
        'st.st_type as st_type',
        'st.st_time as st_time',
        'COUNT(sr.sr_idx) AS cnt',
        'sr.sr_idx as sr_idx',
        'sh.sh_idx as sh_idx',
      ])
      .innerJoin(Shuttle, 'sh')
      .leftJoin(ShuttleReservation, 'sr', 'sr.shuttle_time_idx = st.st_idx AND sr.shuttle_idx = sh.sh_idx')
      .andWhere('sh.sh_idx IN(:shIdxs)', { shIdxs })
      .andWhere('st.company_idx = :company_idx', { company_idx: filter.company_idx })
      .andWhere('sr.sr_meet_date is null OR sr.sr_meet_date = :date', { date: filter.date })
      .groupBy('st.st_idx')
      .addGroupBy('sh.sh_idx')
      .addGroupBy('sr.sr_meet_date')
    if (filter.st_type) {
      query.andWhere('st.st_type = :st_type', { st_type: filter.st_type })
    }
    if (filter.sh_idx) {
      query.andWhere('sh.sh_idx = :sh_idx', { sh_idx: filter.sh_idx })
    }
    const shuttleTimes = await query.getRawMany()

    const shuttleTimesMap = new Map<number, any[]>()
    shuttleTimes.forEach((shuttleTime) => {
      if (!shuttleTimesMap.has(shuttleTime.sh_idx)) {
        shuttleTimesMap.set(shuttleTime.sh_idx, [])
      }
      if (shuttleTime.sh_idx == null) {
        shuttleTime.cnt = 0
      }
      shuttleTimesMap.get(shuttleTime.sh_idx)?.push(shuttleTime)
    })
    const result = shuttles.map((shuttle) => ({
      ...shuttle,
      times: shuttleTimesMap.get(shuttle.sh_idx) || [],
    }))
    return result
  }

  async findReservationByFilters(filter: ReservationStudentFilterDto) {
    const query = this.shuttleReservationRepository
      .createQueryBuilder('sr')
      .innerJoin(Student, 'student', 'student.st_idx = sr.student_idx')
      .innerJoin(ShuttleTime, 'st', 'st.st_idx = sr.shuttle_time_idx')
      .innerJoin(Shuttle, 'sh', 'sr.shuttle_idx = sh.sh_idx')
      .select([
        'student.st_idx as student_idx',
        'student.st_name as st_name',
        'student.st_contact as st_contact',
        'st.st_type as st_type',
        'st.st_time as st_time',
        'sr.sr_meet_time as sr_meet_time',
        'sr.sr_meet_date as sr_meet_date',
        'sr.student_idx as student_idx',
        'sr.sr_address as sr_address',
        'sr.sr_address_memo as sr_address_memo',
        'sr.sr_address_x as sr_address_x',
        'sr.sr_address_y as sr_address_y',
        'sr.sr_state as sr_state',
      ])
      .where('sh.sh_state NOT IN(0, 3)')
    // where 문
    if (filter.date) {
      query.andWhere('sr.sr_meet_date = :date', { date: filter.date })
    }
    if (filter.st_type) {
      query.andWhere('st.st_type = :st_type', { st_type: filter.st_type })
    }
    if (filter.mycar == 1) {
      query.andWhere('sh.driver_idx = :us_idx', { us_idx: filter.us_idx })
    }
    if (filter.shuttle_idx) {
      query.andWhere('sr.shuttle_idx = :shuttle_idx', { shuttle_idx: filter.shuttle_idx })
    }
    if (filter.shuttle_time_idx) {
      query.andWhere('sr.shuttle_time_idx = :shuttle_time_idx', { shuttle_time_idx: filter.shuttle_time_idx })
    }
    // order 문
    query
      .orderBy('sr.sr_meet_date', filter.dir)
      .addOrderBy('st.st_time', filter.dir)
      .addOrderBy('sr.sr_meet_time', filter.dir)
    // listData
    return await getListData(query, filter)
  }

  async parseShuttleArea(data: any) {
    // 1. sh_idx 추출
    const shIdxs = data.map((shuttle: any) => shuttle.sh_idx)
    // 2. 필요한 shuttleAra 싹 긁어오깅..
    const shuttleAreas = await this.shuttleAreaRepository
      .createQueryBuilder('sa')
      .select([
        'sa.sa_idx AS sa_idx',
        'sa.shuttle_idx AS shuttle_idx',
        'sa.area_idx AS area_idx',
        'ar.ar_name AS ar_name',
      ])
      .innerJoin(Area, 'ar', 'sa.area_idx = ar.ar_idx')
      .where('sa.shuttle_idx in(:shIdxs)', { shIdxs })
      .getRawMany()
    // 3. shuttle_idx별로 지역 정보를 그룹화
    const areaMap = new Map<number, any[]>()
    shuttleAreas.forEach((area) => {
      if (!areaMap.has(area.shuttle_idx)) {
        areaMap.set(area.shuttle_idx, [])
      }
      areaMap.get(area.shuttle_idx)?.push(area)
    })
    // 4. data에 지역 정보 추가
    const result = data.map((shuttle: any) => ({
      ...shuttle,
      areas: areaMap.get(shuttle.sh_idx) || [], // 해당하는 지역이 없으면 빈 배열
    }))
    console.log(result)
    return result
  }

  // update 예시
  //   const user = await userRepository.findOne({ where: { us_id: 1 } });

  // if (user) {
  //   user.us_name = 'Updated Name';
  //   user.us_age = 28;
  //   await userRepository.save(user);
  // }
}
