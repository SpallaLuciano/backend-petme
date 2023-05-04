import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ErrorException, WarningException } from '../../common';
import { User } from '../../entities';
import { UserValidationService } from '../user-validation/user-validation.service';
import { UserService } from '../user/user.service';
import { SignDto, UpdatePasswordDto } from './dtos';

export interface SignResponse {
  user: User;
  token: string;
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private userValidationService: UserValidationService,
    private jwtService: JwtService,
  ) {}

  async signIn({ email, password }: SignDto): Promise<SignResponse> {
    const user = await this.userService.findOneBy({ email });

    if (!user) {
      throw new WarningException('Email o contraseña incorrectos');
    }

    const result = await user.compare(password);

    if (!result) {
      throw new WarningException('Email o contraseña incorrectos');
    }

    try {
      const payload = {
        id: user.id,
        admin: user.admin,
      };

      const token = await this.jwtService.signAsync(payload);

      return {
        user,
        token,
      };
    } catch (error) {
      throw new ErrorException('Hubo un problema al iniciar sesión', error);
    }
  }

  async verifyEmail(token: string): Promise<boolean> {
    const { user } = await this.userValidationService.findValidationBy(
      'signUpToken',
      token,
    );

    await this.userService.validateUser(user);

    return true;
  }

  async sendRecoverMail(email: string): Promise<boolean> {
    this.userValidationService.sendRecoverPasswordMail(email);

    return true;
  }

  async recoverPassword(
    token: string,
    dto: UpdatePasswordDto,
  ): Promise<boolean> {
    const validation = await this.userValidationService.findValidationBy(
      'recoverPasswordToken',
      token,
    );

    if (!validation) {
      throw new WarningException('No se encontró el token');
    }

    await this.userService.updatePassword(validation.user, dto.password);
    this.userValidationService.sendUpdatePasswordMail(validation.user.email);

    return true;
  }
}
