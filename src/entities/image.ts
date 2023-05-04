import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base-entity';

@Entity({ name: 'images' })
export class Image extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'varchar', length: 255 })
  url: string;
}
