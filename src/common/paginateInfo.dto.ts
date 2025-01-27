import { IsIn, IsOptional } from 'class-validator'

export class ListDto {
  @IsOptional()
  ip: number = 1

  @IsOptional()
  size: number = 10

  @IsOptional()
  page: number = 1

  @IsOptional()
  order: string = 'created_at'

  @IsOptional()
  @IsIn(['DESC', 'ASC'])
  dir: 'DESC' | 'ASC' = 'ASC'
}

export class CpageInfo {
  size: number
  page: number
  total_count: number
}
