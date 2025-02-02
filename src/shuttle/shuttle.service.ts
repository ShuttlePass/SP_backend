import { Injectable } from '@nestjs/common'
import { successJson, successListJson } from 'src/common/common.service'
import { ShuttleRepository } from './shuttle.repository'
import { CustomException } from 'src/common/exception/ExceptionFilter'
import { returnInfos } from 'src/common/exception/ErrorMessages'
import { CarFilterDto } from './shuttle.dto'

@Injectable()
export class ShuttleService {
  constructor(private shuttleRepository: ShuttleRepository) {}

  async create(data: any) {
    if (!data) {
      throw new CustomException(returnInfos.BackEnd)
    }
    return successJson('요청 성공', data)
  }

  async carList(filter: CarFilterDto) {
    const { data, pageInfo } = await this.shuttleRepository.findShuttleByFilters(filter)
    // option 확인해서 data에 등록 수업 넣기기
    return successListJson('차량 목록', data, pageInfo)
  }
}
