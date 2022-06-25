export interface FriendResponse {
  userId: number
  description: string
  emoji: string
  profileImage: string
  expiredAt: Date
  interesting: boolean
}

export class CreateFriendRequest {
  userId: number
  targetUserId: number
}
