import { Exclude } from 'class-transformer';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToOne } from 'typeorm';
import { compareHash, EncryptedColumn, hash } from '../common';
import { BaseEntity } from './base-entity';
import { Profile } from './profile';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @EncryptedColumn({ unique: true })
  email: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ default: false })
  admin: boolean;

  @Column({ default: false })
  validated: boolean;

  @Column({ default: true })
  active: boolean;

  @OneToOne(() => Profile, (profile) => profile.user, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  profile: Profile;

  async compare(password: string): Promise<boolean> {
    return await compareHash(password, this.password);
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await hash(this.password);
    }
  }
}
