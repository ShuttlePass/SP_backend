import { IsNotEmpty, IsOptional } from 'class-validator'
import { ListDto } from 'src/common/paginateInfo.dto'

export class CreateStudentDto {
  company_idx: number

  @IsNotEmpty()
  area_idx: number

  @IsNotEmpty()
  st_name: string

  @IsNotEmpty()
  st_contact: string

  @IsNotEmpty()
  st_address: string
}

export class StudentFilterDto extends ListDto {
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
