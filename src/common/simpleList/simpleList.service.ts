import { Injectable } from '@nestjs/common'
import { successJson } from 'src/common/common.service'
import { AreaRepository } from 'src/entity/area.repository'
import { CompanyRepository } from 'src/entity/company.repository'
import { JwtPayload } from '../auth/jwt.strategy'
import { AreaFilterDto } from './simpleList.dto'

@Injectable()
export class SimpleListService {
  constructor(
    private areaRepository: AreaRepository,
    private companyRepository: CompanyRepository,
  ) {}

  async companyList() {
    const companyList = await this.companyRepository.getAll()
    return successJson('회사 목록', companyList)
  }

  async areaList(user: JwtPayload, filter: AreaFilterDto) {
    filter.company_idx = user.company_idx
    const areaList = await this.areaRepository.findByCompanyIdx(filter)
    return successJson('지역 목록', areaList)
  }
}
