import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { AuthModule } from 'src/common/auth/AuthModule'
import { UserRepository } from './user.repository'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
