import { PartialType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { PetKind } from '../../../entities';

export class CreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(PetKind)
  petKind: PetKind;
}

export class UpdateDto extends PartialType(CreateDto) {}
