import { Controller, Post, Body, Param, Query } from '@nestjs/common'
import { SimpleListService } from './simpleList.service'
import { SkipAuth } from 'src/common/auth/SkipAuthDecorator'

@Controller('list')
export class SimpleListController {
  constructor(private readonly simpleListService: SimpleListService) {}

  

}
