import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserValidation } from '../../entities';
import { MailerModule } from '../mailer/mailer.module';
import { UserValidationService } from './user-validation.service';

@Module({
  imports: [MailerModule, TypeOrmModule.forFeature([UserValidation])],
  providers: [UserValidationService],
  exports: [UserValidationService],
})
export class UserValidationModule {}
