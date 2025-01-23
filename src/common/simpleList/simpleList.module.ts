import { Module } from '@nestjs/common'
import { SimpleListService } from './simpleList.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from 'src/common/auth/AuthModule'
import { Area } from 'src/entity/area.entity'
import { SimpleListController } from './simpleList.controller'
import { AreaRepository } from 'src/entity/area.repository'
import { CompanyRepository } from 'src/entity/company.repository'
import { Company } from 'src/entity/company.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Area, Company]), AuthModule],
  controllers: [SimpleListController],
  providers: [SimpleListService, AreaRepository, CompanyRepository],
})
export class SimpleListModule {}
