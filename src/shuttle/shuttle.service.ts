import { Injectable } from '@nestjs/common'
import { successJson, successListJson } from 'src/common/common.service'
import { ShuttleRepository } from './shuttle.repository'
import { CustomException } from 'src/common/exception/ExceptionFilter'
import { returnInfos } from 'src/common/exception/ErrorMessages'
import {
  CarFilterDto,
  EnterDriverDto,
  ReservationStudentFilterDto,
  ShuttleFilterDto,
  ShuttleMatchFilterDto,
  ShuttleReservationDto,
} from './shuttle.dto'
import { UserRepository } from 'src/user/user.repository'
import { us_level } from 'src/user/user.dto'
import { InjectDataSource } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'
import { ClassesRepository } from 'src/classes/classes.repository'
import { StudentRepository } from 'src/student/student.repository'

@Injectable()
export class ShuttleService {
  constructor(
    private shuttleRepository: ShuttleRepository,
    private userRepository: UserRepository,
    private classesRepository: ClassesRepository,
    private studentRepository: StudentRepository,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  async create(data: any) {
    if (!data) {
      throw new CustomException(returnInfos.BackEnd)
    }
    return successJson('요청 성공', data)
  }

  async carList(filter: CarFilterDto) {
    // eslint-disable-next-line prefer-const
    let { data, pageInfo } = await this.shuttleRepository.findShuttleByFilters(filter)
    // todo - 지역 1:n 넣기
    data = await this.shuttleRepository.parseShuttleArea(data)
    return successListJson('차량 목록', data, pageInfo)
  }

  async enterDriver(dto: EnterDriverDto) {
    // us_idx가 driver인지 확인
    const user = await this.userRepository.findOneUserByIdx(dto.us_idx)
    if (!user) {
      throw new CustomException(returnInfos.BadRequest)
    }
    if (user.company_idx != dto.company_idx || user.us_level != us_level.driver) {
      throw new CustomException(returnInfos.BadRequest, '같은 회사 직원이 아니거나, driver이 아닌 회원임(manager)')
    }
    const car = await this.shuttleRepository.findOneByDriverIdx(dto.us_idx, dto.sh_idx)
    if (car) {
      throw new CustomException(returnInfos.AlreadyHaveShuttle)
    }
    await this.shuttleRepository.updateShuttleDriver(dto)
    return successJson('기사 배정 성공')
  }

  async shuttleReservation(dto: ShuttleReservationDto) {
    return await this.dataSource.transaction(async (manager) => {
      // 올바른 shuttle_idx, shuttle_time_idx, student_idx인지 확인
      const checkIdx = await this.shuttleRepository.findOneByIdxs(dto)
      if (!checkIdx) {
        throw new CustomException(returnInfos.BadRequest)
      }
      // 이미 해당 날짜 해당 시간에 예약한건 아닌지..
      const checkReservation = await this.shuttleRepository.findShuttleReservationEnrollment(dto)
      if (checkReservation) {
        throw new CustomException(returnInfos.AlreadyReservation)
      }
      // 해당 날짜에 등록한 수업 없음
      const checkClasses = await this.classesRepository.findClassesEnrollByCeDateAndStudentIdx(
        dto.sr_meet_date,
        dto.student_idx,
      )
      if (!checkClasses) {
        throw new CustomException(returnInfos.NoClasses)
      }
      // student
      const student = await this.studentRepository.findOneByCompanyIdxAndStudentIdx(dto.company_idx, dto.student_idx)
      if (!student) {
        throw new CustomException(returnInfos.BadRequest)
      }
      if (!dto.sr_address) {
        dto.sr_address = student.st_address
      }
      // shuttleReservation 생성
      const shuttleReservation = await this.shuttleRepository.createShuttleReservation(dto, manager)
      dto.shuttle_reservation_idx = shuttleReservation.sr_idx
      // shuttleReservationEnrollment 생성
      await this.shuttleRepository.createShuttleReservationEnrollment(dto, manager)
      return successJson('셔틀 배정 성공')
    })
  }

  async shuttleList(filter: ShuttleFilterDto) {
    const result = await this.shuttleRepository.findByFilters(filter)
    return successListJson('셔틀 목록', result)
  }

  async shuttleReservationStudentList(filter: ReservationStudentFilterDto) {
    const result = await this.shuttleRepository.findReservationByFilters(filter)
    return successListJson('셔틀 예약 목록', result)
  }

  async shuttleMatchList(filter: ShuttleMatchFilterDto) {
    const student = await this.studentRepository.findOneByCompanyIdxAndStudentIdx(
      filter.company_idx,
      filter.student_idx,
    )
    if (!student) {
      throw new CustomException(returnInfos.BadRequest, '잘못된 student_idx')
    }
    filter.area_idx = student.area_idx
    const result = await this.shuttleRepository.findShuttleByAreaIdx(filter)
    return successListJson('셔틀 예약 목록', result)
  }
}
