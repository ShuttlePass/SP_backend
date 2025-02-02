import { Controller, Post, Body, Request, Get } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto, LoginUserDto } from './user.dto'
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
}
