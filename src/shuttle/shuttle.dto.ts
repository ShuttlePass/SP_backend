import { IsOptional } from 'class-validator'
import { ListDto } from 'src/common/paginateInfo.dto'

export class CarFilterDto extends ListDto {
  @IsOptional()
  sh_idx: number
}
