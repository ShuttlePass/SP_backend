import { JwtPayload } from 'src/common/auth/jwt.strategy'
import { us_level } from 'src/user/user.dto'
import { CpageInfo, ListDto } from './paginateInfo.dto'
import { SelectQueryBuilder } from 'typeorm'

export const successJson = (message: string, data?: any, code?: number) => {
  return {
    message: message,
    code: code ?? 1,
    data: data,
  }
}

export const successListJson = (message: string, data?: any, pageInfo?: CpageInfo) => {
  return {
    message,
    code: 1,
    data,
    pageInfo,
  }
}

export const checkManger = (user: JwtPayload) => {
  return user.us_level == us_level.manager
}

export type paginateReturn = {
  data: any
  pageInfo?: CpageInfo
}

export const getPaginateData = async (query: SelectQueryBuilder<any>, dto: ListDto) => {
  const items = await query
    .skip((dto.page - 1) * dto.size)
    .take(dto.size)
    .getRawMany()
  const total = await query.getCount()
  return {
    data: items,
    pageInfo: {
      size: dto.size,
      page: dto.page,
      total_count: total,
    },
  } as paginateReturn
}

export const getListData = async (query: SelectQueryBuilder<any>, dto: ListDto) => {
  let listData = { data: {} } as paginateReturn
  if (dto.ip == 1) {
    listData = await getPaginateData(query, dto)
  } else {
    listData.data = await query.getRawMany()
  }
  return listData as paginateReturn
}
