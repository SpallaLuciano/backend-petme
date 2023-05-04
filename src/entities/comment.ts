import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base-entity';
import { Profile } from './profile';

@Entity({ name: 'comments' })
export class Comment extends BaseEntity {
  @ManyToOne(() => Profile, (profile) => profile.ownComments)
  author: Profile;

  @ManyToOne(() => Profile, (profile) => profile.comments)
  recipient: Profile;

  @Column({ type: 'varchar', length: 255 })
  comment: string;

  @Column({ type: 'timestamp' })
  datetime: Date;

  @Column({ type: 'float' })
  rating: number;
}
