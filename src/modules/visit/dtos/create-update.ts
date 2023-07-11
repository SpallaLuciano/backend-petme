import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { parseISO } from 'date-fns';
import { IsBeforeYears } from '../../../common';

export class CreateDto {
  @ApiProperty({ type: Date })
  @Transform(({ value }) => parseISO(value))
  @IsBeforeYears({ years: 0 })
  date: Date;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  place: string;

  @IsString()
  @IsNotEmpty()
  visitType: string;
}

export class UpdateDto extends PartialType(CreateDto) {}
