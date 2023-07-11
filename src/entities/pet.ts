import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { EncryptedColumn } from '../common';
import { BaseEntity } from './base-entity';
import { Coordinates } from './coordinates';
import { Image } from './image';
import { Profile } from './profile';
import { Requirement } from './requirement';
import { Health } from './health';
import { OwnerRequest } from './owner-request';

export enum PetKind {
  DOG = 'Perro',
  CAT = 'Gato',
}

export enum PetSize {
  LARGE = 'Grande',
  MEDIUM = 'Mediano',
  SMALL = 'Pequeño',
  UNKNOWN = 'Desconocido',
}

export enum PetGender {
  MALE = 'Macho',
  FEMALE = 'Hembra',
}

@Entity({ name: 'pets' })
export class Pet extends BaseEntity {
  @EncryptedColumn({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'enum', enum: PetKind, enumName: 'pets_kind_enum' })
  kind: PetKind;

  @Column({ type: 'enum', enum: PetSize, enumName: 'pets_size_enum' })
  size: PetSize;

  @Column({ type: 'enum', enum: PetGender, enumName: 'pets_gender_enum' })
  gender: PetGender;

  @EncryptedColumn({ type: 'varchar', length: 255 })
  birthdate: Date;

  @EncryptedColumn({ type: 'varchar', length: 255 })
  description: string;

  @EncryptedColumn({ type: 'varchar', length: 255, nullable: true })
  coordinates?: Coordinates;

  @Column({ type: 'json', array: true, default: [] })
  requirements: Requirement[];

  @ManyToOne(() => Profile, { eager: true })
  owner: Profile;

  @ManyToOne(() => Profile, { nullable: true })
  adopter: Profile;

  @OneToOne(() => Health, (health) => health.pet, {
    eager: true,
    cascade: true,
  })
  health: Health;

  @ManyToMany(() => Image, { eager: true, cascade: true })
  @JoinTable()
  images: Image[];

  @OneToMany(() => OwnerRequest, (ownerRequest) => ownerRequest.pet)
  ownerRequests: OwnerRequest[];
}
