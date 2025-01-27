import { IsOptional } from 'class-validator'
import { ListDto } from 'src/common/paginateInfo.dto'

export class ClassesFilterDto extends ListDto {
  company_idx: number
  @IsOptional()
  ar_name: string

  @IsOptional()
  area_idx: number

  @IsOptional()
  st_name: string

  @IsOptional()
  st_contact: string

  @IsOptional()
  st_address: string

  @IsOptional()
  st_idx: number
}
