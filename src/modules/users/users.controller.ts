import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common'
import {
  CreateNotificationRequest,
  CreateSubscribeRequest,
  CreateUserRequest,
  SearchUserRequest,
  UnSubscribeRequest,
  UpdateUserRequest,
} from './users.dto'
import { UsersService } from './users.service'

@Controller('/apis/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me/:userId')
  public async me(@Param('userId', ParseIntPipe) userId: number) {
    return this.usersService.me(userId)
  }

  @Get('notification/:userId')
  public async notifications(@Param('userId', ParseIntPipe) userId: number) {
    return this.usersService.findNotifications(userId)
  }

  @Get()
  public async users(@Query() searchUserRequest: SearchUserRequest) {
    return this.usersService.search(searchUserRequest)
  }

  @Post('me')
  public async createMe(@Body() createUserRequest: CreateUserRequest) {
    await this.usersService.create(createUserRequest)
  }

  @Post('notification')
  public async createNotification(@Body() createNotificationRequest: CreateNotificationRequest) {
    await this.usersService.createNotification(createNotificationRequest)
  }

  @Post('subscribe')
  public async createSubscribe(@Body() createSubscribeRequest: CreateSubscribeRequest) {
    await this.usersService.createSubscribe(createSubscribeRequest)
  }

  @Post('unsubscribe')
  public async unsubscribe(@Body() unSubscribeRequest: UnSubscribeRequest) {
    await this.usersService.unsubscribe(unSubscribeRequest)
  }

  @Patch('me')
  public async update(@Body() updateUserRequest: UpdateUserRequest) {
    await this.usersService.update(updateUserRequest)
  }
}
