import { Module } from '@nestjs/common'
import { ClassesController } from './classes.controller'
import { ClassesService } from './classes.service'
import { ClassesRepository } from './classes.repository'
import { Classes } from './classes.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from 'src/common/auth/AuthModule'
import { ClassesName } from './classesName.entity'
import { ClassesEnrollment } from './classesEnrollment.entity'
import { ClassesDay } from './classesDay.entity'
import { StudentModule } from 'src/student/student.module'

@Module({
  imports: [TypeOrmModule.forFeature([Classes, ClassesName, ClassesEnrollment, ClassesDay]), AuthModule, StudentModule],
  controllers: [ClassesController],
  providers: [ClassesService, ClassesRepository],
  exports: [ClassesRepository],
})
export class ClassesModule {}
