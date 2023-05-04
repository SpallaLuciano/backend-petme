import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base-entity';
import { Health } from './health';
import { VisitType } from './visit-type';

@Entity({ name: 'visits' })
export class Visit extends BaseEntity {
  @Column({ type: 'date' })
  datetime: Date;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @Column({ type: 'varchar', length: 255 })
  place: string;

  @ManyToOne(() => Health)
  health: Health;

  @ManyToOne(() => VisitType)
  type: VisitType;
}
