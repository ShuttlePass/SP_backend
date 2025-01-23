import { IsOptional } from 'class-validator'

export class AreaFilterDto {
  @IsOptional()
  ar_name?: string
  company_idx?: number
}
