import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { options } from './passport/jwt-options';
import { JwtStrategy } from './passport/passport-jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { UserValidationModule } from '../user-validation/user-validation.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register(options),
    UserModule,
    UserValidationModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
