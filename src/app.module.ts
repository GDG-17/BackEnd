import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { Friend } from './libs/entities/friends.entity'
import { Notification } from './libs/entities/notification.entity'
import { User } from './libs/entities/user.entity'
import { FriendsModule } from './modules/friends/friends.module'
import { UsersModule } from './modules/users/users.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'qwer1234@',
      database: 'local',
      entities: [User, Friend, Notification], // 사용할 entity의 클래스명을 넣어둔다.
      synchronize: true,
    }),
    UsersModule,
    FriendsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
