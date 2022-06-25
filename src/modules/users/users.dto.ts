export class CreateUserRequest {
  userName: string
  emoji: string
  description: string
  profileImage: string
}

export class UpdateUserRequest extends CreateUserRequest {
  userId: number
  expiredAt: Date
}

export class SearchUserRequest {
  f: string
  name: string
}

export class SearchUserResponse {
  userId: number
  userName: string
  description: string
  emoji: string
  profileImage: string
  expiredAt: Date
  interesting: boolean
}

export class CreateSubscribeRequest {
  userId: number
  targetUserId: number
}

export class UnSubscribeRequest extends CreateSubscribeRequest {}

export class CreateNotificationRequest extends CreateSubscribeRequest {
  emoji: string
}

export class NotificationResponse {
  emoji: string
  text: string
}
