import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base-entity';
import { Health } from './health';
import { VisitType } from './visit-type';

@Entity({ name: 'visits' })
export class Visit extends BaseEntity {
  @Column({ type: 'timestamp' })
  date: Date;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @Column({ type: 'varchar', length: 255 })
  place: string;

  @ManyToOne(() => Health, (health) => health.visits, { onDelete: 'CASCADE' })
  health: Health;

  @ManyToOne(() => VisitType, { eager: true })
  type: VisitType;
}
