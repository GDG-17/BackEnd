import { ForbiddenException, Injectable } from '@nestjs/common'

import { InjectRepository } from '@nestjs/typeorm'
import { addHours } from 'date-fns'
import { NotFoundError } from 'rxjs'
import { Friend } from 'src/libs/entities/friends.entity'
import { Notification, NotificationType } from 'src/libs/entities/notification.entity'
import { User } from 'src/libs/entities/user.entity'
import { Like, Repository } from 'typeorm'
import {
  CreateNotificationRequest,
  CreateSubscribeRequest,
  CreateUserRequest,
  NotificationResponse,
  SearchUserRequest,
  SearchUserResponse,
  UpdateUserRequest,
} from './users.dto'
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    @InjectRepository(Friend)
    private readonly friendRepository: Repository<Friend>,
  ) {}

  public async search(searchUserRequest: SearchUserRequest) {
    const { f, name } = searchUserRequest
    if (f !== 'search') throw new ForbiddenException('권한이 없습니다.')
    const users = await this.userRepository.find({ where: { userName: Like(`%${name}%`) } })
    return users.map((user) => {
      const { id, userName, profileImage, emoji, description, expiredAt } = user
      return {
        userId: id,
        userName,
        description,
        emoji,
        profileImage,
        expiredAt,
        interesting: false,
      } as SearchUserResponse
    })
  }

  public async me(userId: number) {
    const user = await this.userRepository.findOneBy({ id: userId })
    return {
      userId: user.id,
      emoji: user.emoji,
      userName: user.userName,
      description: user.description,
      expiredAt: user.expiredAt,
      profileImage: user.profileImage,
    }
  }

  public async create(createUserRequest: CreateUserRequest) {
    const user = new User({ ...createUserRequest, expiredAt: addHours(new Date(), 1) })

    await this.userRepository.save(user)
  }

  public async update(updateUserRequest: UpdateUserRequest) {
    const { userId, userName, emoji, description, profileImage, expiredAt } = updateUserRequest
    const user = await this.userRepository.findOneBy({ id: userId })
    if (!user) throw new NotFoundError('존재하지않는 유저입니다.')

    user.userName = userName
    user.emoji = emoji
    user.description = description
    user.profileImage = profileImage
    user.expiredAt = expiredAt

    await this.userRepository.save(user)

    const interestingUsers = await this.friendRepository.find({
      where: { targetUserId: userId, interesting: true },
    })

    for (const user of interestingUsers) {
      await this.notificationRepository.save(
        new Notification({ userId, targetUserId: user.id, type: NotificationType.INTERESTING }),
      )
    }
  }

  public async createNotification(createNotificationRequest: CreateNotificationRequest) {
    const { emoji, userId, targetUserId } = createNotificationRequest
    await this.notificationRepository.save(new Notification({ userId, targetUserId, emoji }))
  }

  public async findNotifications(userId: number) {
    const notifications = await this.notificationRepository.find({
      where: { targetUserId: userId },
      relations: ['user'],
    })

    return notifications.map((notification) => {
      const { user, emoji, type } = notification
      const text =
        type === NotificationType.COCK
          ? `${user.userName}님이 회원님을 찔렀습니다🍴`
          : `${user.userName}님이 상태를 변경하셨습니다🥳`
      return {
        emoji,
        text,
      } as NotificationResponse
    })
  }

  public async createSubscribe(createSubscribeRequest: CreateSubscribeRequest) {
    const { userId, targetUserId } = createSubscribeRequest
    const targetUser = await this.userRepository.findOneBy({ id: targetUserId })
    if (!targetUser) throw new NotFoundError('존재하지 않는 유저입니다.')

    const targetFriend = await this.friendRepository.findOne({ where: { userId, targetUserId } })
    if (!targetFriend) throw new NotFoundError('친구추가를 하지않은 유저입니다.')
    if (targetFriend.interesting) throw new ForbiddenException('이미 좋댓구알하고있는 유저입니다.')

    targetFriend.interesting = true
    await this.friendRepository.save(targetFriend)
  }

  public async unsubscribe(createSubscribeRequest: CreateSubscribeRequest) {
    const { userId, targetUserId } = createSubscribeRequest
    const targetUser = await this.userRepository.findOneBy({ id: targetUserId })
    if (!targetUser) throw new NotFoundError('존재하지 않는 유저입니다.')

    const targetFriend = await this.friendRepository.findOne({ where: { userId, targetUserId } })
    if (!targetFriend) throw new NotFoundError('친구추가를 하지않은 유저입니다.')
    if (!targetFriend.interesting)
      throw new ForbiddenException('이미 좋댓구알하고있지않은 유저입니다.')

    targetFriend.interesting = false
    await this.friendRepository.save(targetFriend)
  }
}
