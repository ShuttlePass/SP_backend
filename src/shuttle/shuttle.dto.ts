import { IsNotEmpty, IsOptional } from 'class-validator'
import { ListDto } from 'src/common/paginateInfo.dto'

export class CarFilterDto extends ListDto {
  @IsOptional()
  sh_idx: number

  @IsOptional()
  sh_state_in: number[] = [0, 1, 2]
}

export class EnterDriverDto {
  company_idx: number
  @IsNotEmpty()
  us_idx: number

  @IsNotEmpty()
  sh_idx: number
}

export class CreateShuttleDto {
  company_idx: number

  @IsNotEmpty()
  sh_name: string

  @IsOptional()
  driver_idx: number

  sh_state: number

  @IsNotEmpty()
  sh_max_cnt: number

  @IsNotEmpty()
  area_idx: number[]
}

export class ShuttleReservationEntityDto {
  @IsNotEmpty()
  shuttle_idx: number

  @IsNotEmpty()
  shuttle_time_idx: number

  @IsNotEmpty()
  sr_meet_date: string

  @IsNotEmpty()
  student_idx: number

  @IsOptional()
  sr_address: string

  @IsOptional()
  area_idx: number

  @IsOptional()
  sr_address_memo: string

  @IsOptional()
  sr_address_x: number

  @IsOptional()
  sr_address_y: number

  sr_state: number
}

export class ShuttleReservationDto extends ShuttleReservationEntityDto {
  company_idx: number
  shuttle_reservation_idx: number

  @IsNotEmpty()
  classes_enrollment_idxs: number[]
}

export class ShuttleFilterDto extends ListDto {
  @IsNotEmpty()
  date: Date

  @IsOptional()
  st_type: number

  @IsOptional()
  sh_idx: number

  @IsOptional()
  sh_state_in: number[] = [0, 1, 2]
}

export class ReservationStudentFilterDto extends ListDto {
  us_idx: number
  @IsOptional()
  date: string

  @IsOptional()
  st_type: number

  @IsOptional()
  shuttle_idx: number

  @IsOptional()
  shuttle_time_idx: number

  @IsOptional()
  mycar: number = 0
}

export class ShuttleMatchFilterDto extends ListDto {
  area_idx: number
  @IsNotEmpty()
  student_idx: number
}
