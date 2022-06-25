import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Friend } from 'src/libs/entities/friends.entity'
import { Notification } from 'src/libs/entities/notification.entity'
import { User } from 'src/libs/entities/user.entity'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
  imports: [TypeOrmModule.forFeature([User, Notification, Friend])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [],
})
export class UsersModule {}
