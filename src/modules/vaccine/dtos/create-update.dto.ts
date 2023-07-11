import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { PetKind } from '../../../entities';

export class CreateDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ enum: PetKind })
  @IsEnum(PetKind)
  petKind: PetKind;
}

export class UpdateDto extends PartialType(CreateDto) {}
