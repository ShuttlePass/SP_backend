import { Injectable } from '@nestjs/common'
import { successListJson } from 'src/common/common.service'
import { AreaRepository } from 'src/entity/area.repository'
import { CompanyRepository } from 'src/entity/company.repository'
import { JwtPayload } from '../auth/jwt.strategy'
import { AreaFilterDto } from './simpleList.dto'
import { ListDto } from '../paginateInfo.dto'

@Injectable()
export class SimpleListService {
  constructor(
    private areaRepository: AreaRepository,
    private companyRepository: CompanyRepository,
  ) {}

  async companyList(filter: ListDto) {
    const { data, pageInfo } = await this.companyRepository.findBy(filter)
    return successListJson('회사 목록', data, pageInfo)
  }

  async areaList(user: JwtPayload, filter: AreaFilterDto) {
    filter.company_idx = user.company_idx
    const { data, pageInfo } = await this.areaRepository.findByFilters(filter)
    return successListJson('지역 목록', data, pageInfo)
  }
}
