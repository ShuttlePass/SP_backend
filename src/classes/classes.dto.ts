import { IsNotEmpty, IsOptional } from 'class-validator'
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
  ce_date: Date

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
