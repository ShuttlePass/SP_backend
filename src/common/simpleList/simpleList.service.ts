import { Injectable } from '@nestjs/common'
import { successJson } from 'src/common/common.service'
import { CustomException } from 'src/common/exception/ExceptionFilter'
import { returnInfos } from 'src/common/exception/ErrorMessages'
import { AreaRepository } from 'src/entity/area.repository'

@Injectable()
export class SimpleListService {
  constructor(private areaRepository: AreaRepository) {}

  async create(data: any) {
    if (!data) {
      throw new CustomException(returnInfos.BackEnd)
    }
    return successJson('요청 성공', data)
  }
}
