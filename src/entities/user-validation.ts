import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from './base-entity';
import { User } from './user';

@Entity({ name: 'users_validations' })
export class UserValidation extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  signUpToken: string;

  @Column({ type: 'timestamp' })
  signUpDate: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  recoverPasswordToken?: string;

  @Column({ type: 'timestamp', nullable: true })
  recoverPasswordDate?: Date;

  @OneToOne(() => User, {
    nullable: false,
  })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;
}
