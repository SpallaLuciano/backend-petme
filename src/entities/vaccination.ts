import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base-entity';
import { Health } from './health';
import { Vaccine } from './vaccine';

@Entity('vaccinations')
export class Vaccination extends BaseEntity {
  @ManyToOne(() => Health, (health) => health.vaccinations)
  health: Health;

  @ManyToOne(() => Vaccine, (vaccine) => vaccine.vaccinations, { eager: true })
  vaccine: Vaccine;

  @Column({ type: 'timestamp' })
  applicationDate: Date;
}
