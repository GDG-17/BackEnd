import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm'
import { User } from './user.entity'

@Entity()
export class Friend {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  userId: number

  @JoinColumn()
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  targetUser: User

  @Column()
  targetUserId: number

  @Column({ default: false })
  interesting: boolean

  constructor(partial?: Partial<Friend>) {
    return Object.assign(this, partial)
  }
}
