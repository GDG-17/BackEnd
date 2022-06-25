import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  userName: string

  @Column()
  profileImage: string

  @Column()
  emoji: string

  @Column()
  description: string

  @Column()
  expiredAt: Date

  constructor(partial?: Partial<User>) {
    return Object.assign(this, partial)
  }
}
