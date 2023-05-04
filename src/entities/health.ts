import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from './base-entity';
import { Pet } from './pet';
import { Visit } from './visit';

@Entity({ name: 'health' })
export class Health extends BaseEntity {
  @Column({ type: 'integer' })
  weight?: number;

  @Column({ type: 'varchar', array: true, default: [] })
  vaccines: string[];

  @OneToOne(() => Pet)
  pet: Pet;

  @OneToMany(() => Visit, (visit) => visit.health)
  visits: Visit[];
}
