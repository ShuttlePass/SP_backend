import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  // 애플리케이션이 시작될 때 실행
  async onModuleInit() {
    await this.$connect() // 데이터베이스 연결
    console.log('Prisma connected')
  }

  // 애플리케이션이 종료될 때 실행
  async onModuleDestroy() {
    await this.$disconnect() // 데이터베이스 연결 해제
    console.log('Prisma disconnected')
  }
}
