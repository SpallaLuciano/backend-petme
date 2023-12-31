import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, MinLength } from 'class-validator';
import { parseISO } from 'date-fns';
import { IsBeforeYears } from '../../../common';

export class CreateProfileDto {
  @ApiProperty()
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  lastname: string;

  @ApiProperty({ type: Date })
  @Transform(({ value }) => parseISO(value))
  @IsBeforeYears({
    years: 18,
  })
  birthdate: Date;
}

export class UpdateDto extends PartialType(CreateProfileDto) {}
