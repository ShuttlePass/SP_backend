import { Injectable } from '@nestjs/common'
import { CreateUserDto, LoginUserDto, UserFilterDto } from './user.dto'
import { comparePasswords, hashPassword } from 'src/common/auth/password.service'
import { AuthService } from 'src/common/auth/auth.service'
import { successJson, successListJson } from 'src/common/common.service'
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
    const user = await this.userRepository.findOneUserById(loginUserDto.us_id)
    if (!user) {
      throw new CustomException(returnInfos.WrongId)
    }
    const pwdIsMatch = await comparePasswords(loginUserDto.us_password, user.us_password)
    if (!pwdIsMatch) {
      throw new CustomException(returnInfos.WrongPassword)
    }
    const token = await this.authService.encodeToken(user)
    return successJson('로그인 성공', { us_level: user.us_level, company_idx: user.company_idx, token })
  }

  async createUser(createUserDto: CreateUserDto) {
    // 사용자 생성 로직
    const idCheck = await this.userRepository.findOneUserById(createUserDto.us_id)
    if (idCheck) {
      throw new CustomException(returnInfos.AlreadyUsedId)
    }
    const chkCompany = await this.userRepository.findOneCompanyByIdx(createUserDto.company_idx)
    if (!chkCompany) {
      throw new CustomException(returnInfos.BadRequest, `잘못된 co_idx, ${createUserDto.company_idx}`)
    }
    createUserDto.us_password = await hashPassword(createUserDto.us_password)
    const user = await this.userRepository.createUser(createUserDto)
    const token = await this.authService.encodeToken(user)
    return successJson('회원 가입 성공', token)
  }

  async myInfo(us_idx: number) {
    const user = await this.userRepository.findOneUserByIdx(us_idx)
    if (!user) {
      throw new CustomException(returnInfos.BadRequest)
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { us_password, ...filteredUser } = user
    return successListJson('내 정보', filteredUser)
  }

  async list(filter: UserFilterDto) {
    const { data, pageInfo } = await this.userRepository.findByFilters(filter)
    return successListJson('회원 목록', data, pageInfo)
  }
}
