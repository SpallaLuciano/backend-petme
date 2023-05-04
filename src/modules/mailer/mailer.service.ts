import { Injectable } from '@nestjs/common';
import { MailerService as NestMailerService } from '@nestjs-modules/mailer';
import {
  getRecoverMail,
  getVerificationMail,
  updatedPasswordMail,
} from './mails';

@Injectable()
export class MailerService {
  constructor(private mailerService: NestMailerService) {}

  async sendVerificationMail(email: string, token: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Te damos la bienvenida a PetMe',
      html: getVerificationMail(token),
    });
  }

  async sendRecoverPasswordMail(email: string, token: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Recupero de contraseña',
      html: getRecoverMail(token),
    });
  }

  async sendUpdatedPasswordMail(email: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Contraseña modificada con éxito',
      html: updatedPasswordMail,
    });
  }
}
