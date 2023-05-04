import { IsHexColor, IsNotEmpty, IsString } from 'class-validator';

export class CreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  label: string;

  @IsHexColor()
  color: string;
}
