import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { EncryptedColumn } from '../common';
import { BaseEntity } from './base-entity';
import { Chat } from './chat';
import { Profile } from './profile';

@Entity({ name: 'messages' })
export class Message extends BaseEntity {
  @ManyToOne(() => Chat, (chat) => chat.messages)
  chat: Chat;

  @ManyToOne(() => Profile)
  @JoinColumn()
  sender: Profile;

  @ManyToOne(() => Profile)
  @JoinColumn()
  receiver: Profile;

  @EncryptedColumn({ type: 'varchar', length: 255 })
  content: string;

  @EncryptedColumn({ type: 'varchar', length: 255 })
  datetime: Date;
}
