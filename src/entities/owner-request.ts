import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity } from './base-entity';
import { Evidence } from './evidence';
import { Pet } from './pet';

@Entity({ name: 'owner_requests' })
export class OwnerRequest extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  request: string;

  @Column({ type: 'date', nullable: true })
  dueDate: Date;

  @OneToOne(() => Evidence, { nullable: true })
  evidence: Evidence;

  @ManyToOne(() => Pet, (pet) => pet.ownerRequests)
  pet: Pet;
}
