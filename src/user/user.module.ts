import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { AuthModule } from 'src/common/auth/AuthModule'
import { UserRepository } from './user.repository'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './user.entity'
import { Company } from 'src/entity/company.entity'
import { Shuttle } from 'src/shuttle/shuttle.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User, Company, Shuttle]), AuthModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
