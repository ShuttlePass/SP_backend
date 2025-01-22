import { Injectable } from '@nestjs/common'
import { CreateUserDto, LoginUserDto } from './user.dto'
import { comparePasswords, hashPassword } from 'src/common/auth/password.service'
import { AuthService } from 'src/common/auth/auth.service'
import { successJson } from 'src/common/common.service'
import { CustomException } from 'src/common/exception/ExceptionFilter'
import { returnInfos } from 'src/common/exception/ErrorMessages'
import { UserRepository } from './user.repository'

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository, // @InjectRepository 대신 일반적인 주입
    private authService: AuthService, // AuthService 주입
  ) {}

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userRepository.findUserById(loginUserDto.us_id)
    if (!user) {
      throw new CustomException(returnInfos.WrongId)
    }
    const pwdIsMatch = await comparePasswords(loginUserDto.us_password, user.us_password)
    if (!pwdIsMatch) {
      throw new CustomException(returnInfos.WrongPassword)
    }
    const token = await this.authService.encodeToken(user)
    return successJson('로그인 성공', token)
  }

  async createUser(createUserDto: CreateUserDto) {
    // 사용자 생성 로직
    const idCheck = await this.userRepository.findUserById(createUserDto.us_id)
    if (idCheck) {
      throw new CustomException(returnInfos.AlreadyUsedId)
    }
    createUserDto.us_password = await hashPassword(createUserDto.us_password)
    const user = await this.userRepository.createUser(createUserDto)
    const token = await this.authService.encodeToken(user)
    return successJson('회원 가입 성공', token)
  }
}
