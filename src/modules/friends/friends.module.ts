import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Friend } from 'src/libs/entities/friends.entity'
import { FriednsController } from './friends.controller'
import { FriendsService } from './friends.service'

@Module({
  imports: [TypeOrmModule.forFeature([Friend])],
  providers: [FriendsService],
  controllers: [FriednsController],
  exports: [],
})
export class FriendsModule {}
