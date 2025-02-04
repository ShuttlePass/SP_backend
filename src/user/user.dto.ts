import { IsString, IsNotEmpty, Length, IsIn, IsInt, IsOptional } from 'class-validator'
import { ListDto } from 'src/common/paginateInfo.dto'

export enum us_level {
  manager = 'manager',
  driver = 'driver',
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  us_id: string

  @IsString()
  @IsNotEmpty()
  @Length(8, 32)
  us_password: string

  @IsIn(['manager', 'driver'])
  @IsNotEmpty()
  us_level: us_level

  @IsNotEmpty()
  @IsInt()
  company_idx: number

  @IsString()
  @IsNotEmpty()
  us_contact: string

  @IsString()
  @IsNotEmpty()
  us_name: string
}

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  us_id: string

  @IsString()
  @IsNotEmpty()
  @Length(8, 32)
  us_password: string
}

export class UserFilterDto extends ListDto {
  @IsOptional()
  us_idx: number

  @IsOptional()
  us_level: us_level

  @IsOptional()
  us_name: string

  @IsOptional()
  us_contact: string
}
