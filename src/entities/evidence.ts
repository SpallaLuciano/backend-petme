import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from './base-entity';
import { Image } from './image';

@Entity({ name: 'evidence' })
export class Evidence extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  description: string;

  @OneToOne(() => Image, { nullable: true, onDelete: 'CASCADE', cascade: true })
  @JoinColumn()
  image: Image;
}
