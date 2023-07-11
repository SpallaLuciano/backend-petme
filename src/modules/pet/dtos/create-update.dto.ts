import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsEnum,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { PetGender, PetKind, PetSize } from '../../../entities';
import { Transform, Type } from 'class-transformer';
import { parseISO } from 'date-fns';
import { IsBeforeYears } from '../../../common';
import { Coordinates } from '../../../entities/coordinates';

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

  @ApiProperty({ type: Date })
  @Transform(({ value }) => parseISO(value))
  @IsBeforeYears({
    years: 0,
  })
  birthdate: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested()
  @Type(() => CoordinatesDto)
  coordinates: Coordinates;
}

class CoordinatesDto {
  @IsLatitude()
  latitude: string | number;

  @IsLongitude()
  longitude: string | number;
}

export class UpdateDto extends PartialType(CreateDto) {}
