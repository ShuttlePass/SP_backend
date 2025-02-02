import { Module } from '@nestjs/common'
import { StudentController } from './student.controller'
import { StudentService } from './student.service'
import { StudentRepository } from './student.repository'
import { Student } from './student.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from 'src/common/auth/AuthModule'
import { SimpleListModule } from 'src/common/simpleList/simpleList.module'

@Module({
  imports: [TypeOrmModule.forFeature([Student]), AuthModule, SimpleListModule],
  controllers: [StudentController],
  providers: [StudentService, StudentRepository],
  exports: [StudentRepository],
})
export class StudentModule {}
