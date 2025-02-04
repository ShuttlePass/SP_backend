import { IsOptional } from 'class-validator'
import { ListDto } from '../paginateInfo.dto'
import { Transform } from 'class-transformer'

export class AreaFilterDto extends ListDto {
  @IsOptional()
  ar_name?: string

  @IsOptional()
  @Transform(({ value }) => value.split(','))
  ar_idx_in: number[]
}
