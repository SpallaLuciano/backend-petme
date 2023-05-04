import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base-entity';
import { PetKind } from './pet';

@Entity({ name: 'vaccines' })
export class Vaccine extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'enum', enum: PetKind })
  petKind: PetKind;
}
