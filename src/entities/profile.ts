import { Exclude } from 'class-transformer';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { EncryptedColumn } from '../common';
import { BaseEntity } from './base-entity';
import { Comment } from './comment';
import { Image } from './image';
import { User } from './user';

@Entity({ name: 'profiles' })
export class Profile extends BaseEntity {
  @EncryptedColumn({ type: 'varchar', length: 255 })
  name: string;

  @EncryptedColumn({ type: 'varchar', length: 255 })
  lastname: string;

  @Column({ type: 'varchar', array: true, default: [] })
  favs: string[];

  @Exclude()
  @EncryptedColumn<Date>({ type: 'varchar', length: 255 })
  birthdate?: Date;

  @OneToOne(() => User, {
    nullable: false,
    cascade: false,
  })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;

  @OneToOne(() => Image, {
    eager: true,
    nullable: true,
    cascade: true,
  })
  @JoinColumn({ name: 'imageId', referencedColumnName: 'id' })
  image?: Image;

  @OneToMany(() => Comment, (comment) => comment.recipient)
  comments: Comment[];

  @OneToMany(() => Comment, (comment) => comment.author)
  ownComments: Comment[];
}
