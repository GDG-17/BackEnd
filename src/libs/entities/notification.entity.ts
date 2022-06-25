import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm'
import { User } from './user.entity'

export enum NotificationType {
  COCK = 'COCK',
  INTERESTING = 'INTERESTING',
}

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number

  @JoinColumn()
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User

  @Column()
  userId: number

  @Column()
  targetUserId: number

  @Column()
  emoji: string

  @Column({ type: 'enum', enum: NotificationType, default: NotificationType.COCK })
  type: NotificationType

  constructor(partial?: Partial<Notification>) {
    return Object.assign(this, partial)
  }
}
