import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base-entity';
import { PetKind } from './pet';
import { Vaccination } from './vaccination';

@Entity({ name: 'vaccines' })
export class Vaccine extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'enum', enum: PetKind, enumName: 'vaccines_kind_enum' })
  petKind: PetKind;

  @OneToMany(() => Vaccination, (vaccination) => vaccination.vaccine)
  vaccinations: Vaccination[];
}
