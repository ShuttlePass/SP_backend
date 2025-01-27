import { Injectable } from '@nestjs/common'
import { successJson, successListJson } from 'src/common/common.service'
import { ClassesRepository } from './classes.repository'
import { CustomException } from 'src/common/exception/ExceptionFilter'
import { returnInfos } from 'src/common/exception/ErrorMessages'
import { ClassesFilterDto } from './classes.dto'

@Injectable()
export class ClassesService {
  constructor(private classesRepository: ClassesRepository) {}

  async create(data: any) {
    if (!data) {
      throw new CustomException(returnInfos.BackEnd)
    }
    return successJson('요청 성공', data)
  }

  // async list(filter: ClassesFilterDto) {
  //   const { data, pageInfo } = await this.classesRepository.findManyByFilters(filter)
  //   return successListJson('수업 목록', data, pageInfo)
  // }
}
