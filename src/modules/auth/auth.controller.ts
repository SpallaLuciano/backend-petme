import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response, successResponse } from '../../common';
import { AuthService, SignResponse } from './auth.service';
import { RecoverPasswordDto, UpdatePasswordDto } from './dtos';
import { SignDto } from './dtos/sign.dto';

@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('sign-in')
  async signIn(@Body() dto: SignDto): Promise<Response<SignResponse>> {
    const response = await this.authService.signIn(dto);

    return successResponse(response);
  }

  @Get('verify-email/:token')
  async verifyEmail(@Param('token') token: string): Promise<Response<boolean>> {
    const response = await this.authService.verifyEmail(token);

    return successResponse(response);
  }

  @Post('recover-password')
  async recoverPassword(
    @Body() dto: RecoverPasswordDto,
  ): Promise<Response<boolean>> {
    const response = await this.authService.sendRecoverMail(dto.email);

    return successResponse(response);
  }

  @Post('recover-password/:token')
  async updatePassword(
    @Param('token') token: string,
    @Body() dto: UpdatePasswordDto,
  ): Promise<Response<boolean>> {
    const response = await this.authService.recoverPassword(token, dto);

    return successResponse(response);
  }
}
