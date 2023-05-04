import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class RecoverPasswordDto {
  @IsString()
  @IsEmail()
  email: string;
}
