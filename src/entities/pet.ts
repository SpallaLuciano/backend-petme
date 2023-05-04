import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { EncryptedColumn } from '../common';
import { BaseEntity } from './base-entity';
import { Coordinates } from './coordinates';
import { Image } from './image';
import { Profile } from './profile';
import { Requirement } from './requirement';

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

  @Column({ type: 'enum', enum: PetKind })
  kind: PetKind;

  @EncryptedColumn({ type: 'varchar', length: 255 })
  size: PetSize;

  @EncryptedColumn({ type: 'varchar', length: 255 })
  gender: PetGender;

  @EncryptedColumn({ type: 'varchar', length: 255 })
  birthdate: Date;

  @EncryptedColumn({ type: 'varchar', length: 255 })
  description: string;

  @EncryptedColumn({ type: 'varchar', length: 255 })
  coordinates: Coordinates;

  @Column({ type: 'json', array: true, default: [] })
  requirements: Requirement[];

  @ManyToOne(() => Profile)
  owner: Profile;

  @ManyToMany(() => Image)
  @JoinTable()
  images: Image[];
}
