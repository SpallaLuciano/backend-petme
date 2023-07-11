import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { User, UserValidation } from '../../entities';
import { MailerService } from '../mailer/mailer.service';
import { v5 as uuidV5 } from 'uuid';
import { WarningException } from '../../common';

@Injectable()
export class UserValidationService {
  constructor(
    @InjectRepository(UserValidation)
    private userValidationRepository: Repository<UserValidation>,
    private mailerService: MailerService,
  ) {}

  async sendVerificationMail(
    user: User,
    queryRunner: QueryRunner,
  ): Promise<void> {
    const signUpToken = uuidV5('verification', user.id);
    const signUpDate = new Date();

    const validation = this.userValidationRepository.create({
      signUpToken,
      signUpDate,
      user,
    });

    await queryRunner.manager.save(validation);

    await this.mailerService.sendVerificationMail(user.email, signUpToken);
  }

  async findValidationBy(
    key: 'signUpToken' | 'recoverPasswordToken',
    token: string,
  ) {
    const validation = await this.userValidationRepository.findOne({
      where: {
        [key]: token,
      },
      relations: { user: true },
    });

    if (!validation) {
      throw new WarningException('No se encontró el token');
    }

    return validation;
  }

  async sendRecoverPasswordMail(email: string): Promise<void> {
    const validation = await this.userValidationRepository.findOneBy({
      user: {
        email,
      },
    });

    if (validation) {
      const recoverPasswordToken = uuidV5('recover', validation.user.id);
      const recoverPasswordDate = new Date();

      Object.assign(validation, {
        recoverPasswordToken,
        recoverPasswordDate,
      });

      await this.userValidationRepository.save(validation);

      await this.mailerService.sendRecoverPasswordMail(
        email,
        recoverPasswordToken,
      );
    }
  }

  async sendUpdatePasswordMail(email: string): Promise<void> {
    this.mailerService.sendUpdatedPasswordMail(email);
  }
}
