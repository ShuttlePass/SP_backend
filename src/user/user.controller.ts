import { Controller, Post, Body, Request, Get, Query } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto, LoginUserDto, UserFilterDto } from './user.dto'
import { SkipAuth } from 'src/common/auth/SkipAuthDecorator'
import { JwtPayload } from 'src/common/auth/jwt.strategy'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @SkipAuth()
  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto)
  }

  @SkipAuth()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto)
  }

  @Get('/my')
  myInfo(@Request() req: any) {
    const user: JwtPayload = req.user
    return this.userService.myInfo(user.us_idx)
  }

  @Get()
  list(@Request() req: any, @Query() filter: UserFilterDto) {
    const user: JwtPayload = req.user
    filter.company_idx = user.company_idx
    return this.userService.list(filter)
  }
}
