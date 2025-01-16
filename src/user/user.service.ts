import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateUserDto } from './dto/userDto'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    const company = await this.prisma.company.findMany()
    return [company]
  }

  async createUser(createUserDto: CreateUserDto) {
    // 사용자 생성 로직
    const user = await this.prisma.user.create({
      data: createUserDto,
    })
    return user
  }
}
