import { IsArray, IsNotEmpty, IsOptional } from 'class-validator'
import { ListDto } from 'src/common/paginateInfo.dto'

export enum cd_day {
  SUN = 'SUN',
  MON = 'MON',
  TUE = 'TUE',
  WED = 'WED',
  THU = 'THU',
  FRI = 'FRI',
  SAT = 'SAT',
}

export class ClassesFilterDto extends ListDto {
  @IsOptional()
  cn_idx: number // 수업 이름 키 값값

  @IsOptional()
  cn_name: string // 수업 이름

  @IsOptional()
  cd_day: cd_day

  @IsOptional()
  date: Date
}

export class ClassesEnrollDto {
  company_idx: number
  @IsNotEmpty()
  ce_date: string

  @IsNotEmpty()
  student_idx: number

  @IsNotEmpty()
  classes_day_idx: number
}

export class ClassesEnrollFilterDto extends ListDto {
  @IsOptional()
  student_idx: number

  @IsOptional()
  cn_idx: number

  @IsOptional()
  ce_date: Date
}

export class CreateClassesNameDto {
  company_idx: number
  @IsNotEmpty()
  cn_name: string

  @IsNotEmpty()
  cn_max_num: number
}

export class CreateClassesDto {
  company_idx: number
  @IsNotEmpty()
  classes_name_idx: number

  @IsNotEmpty()
  cl_start_at: string

  @IsNotEmpty()
  cl_end_at: string

  @IsNotEmpty()
  @IsArray()
  cd_days: cd_day[]
}
