import { user_us_level } from '@prisma/client'
import { IsString, IsNotEmpty, Length, IsIn, IsInt } from 'class-validator'

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
  us_level: user_us_level

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
