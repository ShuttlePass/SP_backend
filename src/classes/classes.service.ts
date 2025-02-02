import { Injectable } from '@nestjs/common'
import { getEnumDay, successJson, successListJson } from 'src/common/common.service'
import { ClassesRepository } from './classes.repository'
import { CustomException } from 'src/common/exception/ExceptionFilter'
import { returnInfos } from 'src/common/exception/ErrorMessages'
import { ClassesFilterDto } from './classes.dto'
import { ListDto } from 'src/common/paginateInfo.dto'

@Injectable()
export class ClassesService {
  constructor(private classesRepository: ClassesRepository) {}

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
}
