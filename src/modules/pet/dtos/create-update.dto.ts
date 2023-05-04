import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { PetGender, PetKind, PetSize } from '../../../entities';

export class CreateDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ enum: PetKind })
  @IsEnum(PetKind)
  kind: PetKind;

  @ApiProperty({ enum: PetSize })
  @IsEnum(PetSize)
  size: PetSize;

  @ApiProperty({ enum: PetGender })
  @IsEnum(PetGender)
  gender: PetGender;
  birthdate: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;
}

export class UpdateDto extends PartialType(CreateDto) {}
