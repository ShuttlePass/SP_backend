import { Injectable } from '@nestjs/common'
import { getEnumDay, successJson, successListJson } from 'src/common/common.service'
import { ClassesRepository } from './classes.repository'
import { CustomException } from 'src/common/exception/ExceptionFilter'
import { returnInfos } from 'src/common/exception/ErrorMessages'
import { ClassesEnrollDto, ClassesEnrollFilterDto, ClassesFilterDto } from './classes.dto'
import { ListDto } from 'src/common/paginateInfo.dto'
import { StudentRepository } from 'src/student/student.repository'

@Injectable()
export class ClassesService {
  constructor(
    private classesRepository: ClassesRepository,
    private studentRepository: StudentRepository,
  ) {}

  async create(data: any) {
    if (!data) {
      throw new CustomException(returnInfos.BackEnd)
    }
    return successJson('요청 성공', data)
  }

  async nameList(filter: ListDto) {
    const data = await this.classesRepository.findClassesName(filter)
    return successListJson('수업 이름 목록', data)
  }

  async classesList(filter: ClassesFilterDto) {
    if (filter.date) {
      filter.date = new Date(filter.date)
      filter.cd_day = getEnumDay(filter.date)
    }
    const { data, pageInfo } = await this.classesRepository.findClassesByFilters(filter)
    // todo - 현재 등록 인원 파싱하기
    return successListJson('수업 목록', data, pageInfo)
  }

  async enroll(dto: ClassesEnrollDto) {
    // 올바른 st_idx인지 확인(company_idx가 같고, 존재하는지)
    const student = await this.studentRepository.findOneByCompanyIdx(dto.company_idx, dto.student_idx)
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
    // 날짜와 day 맞는지 확인
    if (classes_day.cd_day != getEnumDay(new Date(dto.ce_date))) {
      throw new CustomException(returnInfos.BadRequest, '잘못된 ce_date')
    }
    // 시간 겹치는 수업이 없는지 확인
    const enrollment = await this.classesRepository.chkClassesTime(
      classes_day.classes_idx,
      dto.student_idx,
      dto.ce_date,
    )
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
