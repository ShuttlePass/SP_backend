import { Module } from '@nestjs/common'
import { SimpleListService } from './simpleList.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from 'src/common/auth/AuthModule'
import { Area } from 'src/entity/area.entity'
import { SimpleListController } from './simpleList.controller'
import { AreaRepository } from 'src/entity/area.repository'

@Module({
  imports: [TypeOrmModule.forFeature([Area]), AuthModule],
  controllers: [SimpleListController],
  providers: [SimpleListService, AreaRepository],
})
export class SimpleListModule {}
