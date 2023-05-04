import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base-entity';

@Entity({ name: 'visit_types' })
export class VisitType extends BaseEntity {
  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  label: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  color: string;
}
