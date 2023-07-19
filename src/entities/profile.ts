import { Exclude } from 'class-transformer';
import {
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { EncryptedColumn } from '../common';
import { BaseEntity } from './base-entity';
import { Comment } from './comment';
import { Image } from './image';
import { User } from './user';
import { Pet } from './pet';

@Entity({ name: 'profiles' })
export class Profile extends BaseEntity {
  @EncryptedColumn({ type: 'varchar', length: 255 })
  name: string;

  @EncryptedColumn({ type: 'varchar', length: 255 })
  lastname: string;

  @ManyToMany(() => Pet)
  @JoinTable({
    name: 'profiles_fav_pets',
    joinColumn: {
      name: 'id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'id',
      referencedColumnName: 'id',
    },
  })
  favs: Pet[];

  @Exclude()
  @EncryptedColumn<Date>({ type: 'varchar', length: 255 })
  birthdate?: Date;

  @OneToOne(() => User, {
    nullable: false,
    cascade: false,
    eager: false,
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

  @OneToMany(() => Comment, (comment) => comment.recipient, { eager: true })
  comments: Comment[];

  @OneToMany(() => Comment, (comment) => comment.author, { eager: true })
  ownComments: Comment[];
}
