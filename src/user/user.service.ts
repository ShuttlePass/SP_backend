import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateUserDto } from './dto/userDto'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  getAllUsers() {
    // 데이터베이스에서 모든 사용자 정보 조회
    return [{ id: 1, name: 'John Doe' }]
  }

  async createUser(createUserDto: CreateUserDto) {
    // 사용자 생성 로직
    const user = await this.prisma.user.create({
      data: createUserDto,
    })
    return user
  }
}
