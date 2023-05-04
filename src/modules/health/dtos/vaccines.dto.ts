import { IsNotEmpty, IsString } from 'class-validator';

export class AddRemoveVaccineDto {
  @IsString()
  @IsNotEmpty()
  vaccine: string;
}
