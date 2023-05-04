import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUpdateImageDto {
  @IsString()
  @IsNotEmpty()
  description: string;
}
