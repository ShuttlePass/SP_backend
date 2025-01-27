import { IsOptional } from 'class-validator'
import { ListDto } from '../paginateInfo.dto'

export class AreaFilterDto extends ListDto {
  @IsOptional()
  ar_name?: string
  company_idx?: number
}
