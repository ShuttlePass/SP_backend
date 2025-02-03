import { Injectable } from '@nestjs/common'
import { getEnumDay, successJson, successListJson } from 'src/common/common.service'
import { ClassesRepository } from './classes.repository'
import { CustomException } from 'src/common/exception/ExceptionFilter'
import { returnInfos } from 'src/common/exception/ErrorMessages'
import {
  ClassesEnrollDto,
  ClassesEnrollFilterDto,
  ClassesFilterDto,
  CreateClassesDto,
  CreateClassesNameDto,
} from './classes.dto'
import { ListDto } from 'src/common/paginateInfo.dto'
import { StudentRepository } from 'src/student/student.repository'
import { InjectDataSource } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'

@Injectable()
export class ClassesService {
  constructor(
    private classesRepository: ClassesRepository,
    private studentRepository: StudentRepository,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  async nameCreate(dto: CreateClassesNameDto) {
    const classesName = await this.classesRepository.nameCreate(dto)
    return successJson('수업명 추가 성공', classesName.cn_idx)
  }

  async classesCreate(dto: CreateClassesDto) {
    return await this.dataSource.transaction(async (manager) => {
      // 수업 등록
      const classes = await this.classesRepository.classesCreate(dto, manager)
      // 수업 요일 등록
      await this.classesRepository.classesDayCreate(dto, classes.cl_idx, manager)
      return successJson('수업 생성 성공', classes.cl_idx)
    })
  }

  async nameList(filter: ListDto) {
    const data = await this.classesRepository.findClassesName(filter)
    return successListJson('수업 이름 목록', data)
  }

  async classesList(filter: ClassesFilterDto) {
    if (filter.date) {
      filter.cd_day = getEnumDay(new Date(filter.date))
    }
    // eslint-disable-next-line prefer-const
    let { data, pageInfo } = await this.classesRepository.findClassesByFilters(filter)
    // 현재 등록 인원 파싱하기
    if (filter.date) {
      data = await this.classesRepository.parseClassesNum(data, filter.date)
    }
    return successListJson('수업 목록', data, pageInfo)
  }

  async enroll(dto: ClassesEnrollDto) {
    // 올바른 st_idx인지 확인(company_idx가 같고, 존재하는지)
    const student = await this.studentRepository.findOneByCompanyIdxAndStudentIdx(dto.company_idx, dto.student_idx)
    if (!student) {
      throw new CustomException(returnInfos.BadRequest, '잘못된 student_idx')
    }
    // 유효한 cd_idx인지 확인
    const classes_day = await this.classesRepository.findOneClassesDayByCompanyIdxAndCdIdx(
      dto.company_idx,
      dto.classes_day_idx,
    )
    if (!classes_day) {
      throw new CustomException(returnInfos.BadRequest, '잘못된 classes_day_idx')
    }
    // todo - 이미 꽉찬 수업이면 out!
    // 시간 겹치는 수업이 없는지 확인
    const enrollment = await this.classesRepository.chkClassesTime(
      classes_day.classes_idx,
      dto.student_idx,
      dto.ce_date,
    )
    // 날짜와 day 맞는지 확인
    if (classes_day.cd_day != getEnumDay(new Date(dto.ce_date))) {
      throw new CustomException(returnInfos.BadRequest, '잘못된 ce_date')
    }
    if (enrollment) {
      throw new CustomException(returnInfos.ConflictClassesTime)
    }
    // 등록
    await this.classesRepository.enrollStudent(dto)
    return successJson('수업 배정 성공')
  }

  async enrollList(filter: ClassesEnrollFilterDto) {
    const { data, pageInfo } = await this.classesRepository.findClassesEnrollByFilters(filter)
    return successListJson('배정된 수업 목록', data, pageInfo)
  }
}
