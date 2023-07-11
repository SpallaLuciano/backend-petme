import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { ProfileModule } from './profile/profile.module';
import { FileModule } from './file/file.module';
import { CommentModule } from './comment/comment.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HealthModule } from './health/health.module';
import { VisitTypeModule } from './visit-type/visit-type.module';
import { VisitModule } from './visit/visit.module';
import { ChatModule } from './chat/chat.module';
import { VaccineModule } from './vaccine/vaccine.module';
import { PetModule } from './pet/pet.module';
import { UserValidationModule } from './user-validation/user-validation.module';
import { VaccinationModule } from './vaccination/vaccination.module';

@Module({
  imports: [
    AuthModule,
    ChatModule,
    CommentModule,
    DatabaseModule,
    FileModule,
    HealthModule,
    MailerModule,
    PetModule,
    ProfileModule,
    UserModule,
    UserValidationModule,
    VaccineModule,
    VisitModule,
    VisitTypeModule,
    VaccinationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
