import { IsNotEmpty } from 'class-validator'

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
