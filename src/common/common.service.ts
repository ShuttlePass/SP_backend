import { JwtPayload } from 'src/common/auth/jwt.strategy'
import { us_level } from 'src/user/user.dto'
import { CpageInfo, ListDto } from './paginateInfo.dto'
import { SelectQueryBuilder } from 'typeorm'
import { cd_day } from 'src/classes/classes.dto'

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

// Date 객체에서 요일을 가져와 cd_day enum으로 변환하는 함수
export function getEnumDay(date: Date): cd_day {
  const days: cd_day[] = [cd_day.SUN, cd_day.MON, cd_day.TUE, cd_day.WED, cd_day.THU, cd_day.FRI, cd_day.SAT]
  return days[date.getDay()]
}
