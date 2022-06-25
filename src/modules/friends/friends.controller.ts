import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common'
import { CreateFriendRequest } from './friends.dto'
import { FriendsService } from './friends.service'

@Controller('/apis/friends')
export class FriednsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Get(':userId')
  public async friends(@Param('userId', ParseIntPipe) userId: number) {
    return this.friendsService.findAll(userId)
  }

  @Post()
  public async createMe(@Body() createFriendRequest: CreateFriendRequest) {
    await this.friendsService.create(createFriendRequest)
  }
}
