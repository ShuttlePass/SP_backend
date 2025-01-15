import { Module } from '@nestjs/common'
import { PrismaModule } from './prisma/prisma.module' // PrismaModule import
import { UserModule } from './user/user.module' // UserModule import

@Module({
  imports: [PrismaModule, UserModule], // PrismaModule과 UserModule을 여기서 가져옵니다.
})
export class AppModule {}
