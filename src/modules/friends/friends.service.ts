import { Injectable } from '@nestjs/common'

import { InjectRepository } from '@nestjs/typeorm'
import { Friend } from 'src/libs/entities/friends.entity'
import { Repository } from 'typeorm'
import { CreateFriendRequest, FriendResponse } from './friends.dto'
@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(Friend)
    private readonly friendRepository: Repository<Friend>,
  ) {}

  public async findAll(userId: number) {
    const friends = await this.friendRepository.find({
      where: { userId },
      relations: ['targetUser'],
    })

    return friends
      .map((friend) => {
        const { id, profileImage, emoji, description, expiredAt, userName } = friend.targetUser
        return {
          userId: id,
          userName,
          profileImage,
          expiredAt,
          interesting: friend.interesting,
          description,
          emoji,
        } as FriendResponse
      })
      .sort((l, r) => (l.expiredAt > r.expiredAt ? -1 : l.expiredAt < r.expiredAt ? 1 : 0))
  }

  public async create(createFriendRequest: CreateFriendRequest) {
    const { userId, targetUserId } = createFriendRequest
    await this.friendRepository.save(new Friend({ userId, targetUserId }))
  }
}
