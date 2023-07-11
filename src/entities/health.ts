import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from './base-entity';
import { Pet } from './pet';
import { Visit } from './visit';
import { Vaccination } from './vaccination';

@Entity({ name: 'health' })
export class Health extends BaseEntity {
  @Column({ type: 'integer', nullable: true })
  weight?: number;

  @OneToMany(() => Vaccination, (vaccination) => vaccination.health, {
    eager: true,
  })
  vaccinations: Vaccination[];

  @OneToOne(() => Pet, { onDelete: 'CASCADE' })
  @JoinColumn()
  pet: Pet;

  @OneToMany(() => Visit, (visit) => visit.health, {
    eager: true,
    cascade: true,
  })
  visits: Visit[];
}
