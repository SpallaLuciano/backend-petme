import { Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from './base-entity';
import { Message } from './message';
import { Profile } from './profile';

@Entity({ name: 'chats' })
export class Chat extends BaseEntity {
  @ManyToMany(() => Profile)
  @JoinTable()
  users: Profile[];

  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[];
}
