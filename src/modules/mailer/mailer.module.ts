import { Module } from '@nestjs/common';
import { MailerModule as NestMailerModule } from '@nestjs-modules/mailer';
import { options } from './mailer.options';
import { MailerService } from './mailer.service';

@Module({
  imports: [NestMailerModule.forRoot(options)],
  providers: [MailerService],
  exports: [MailerService],
})
export class MailerModule {}
