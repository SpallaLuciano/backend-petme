import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import { parseISO } from 'date-fns';

export class CreateDto {
  @IsString()
  @IsUUID()
  recipientId: string;

  @IsString()
  @IsNotEmpty()
  comment: string;

  @ApiProperty({ type: Date })
  @Transform(({ value }) => parseISO(value))
  datetime: string;

  @IsNumber()
  @IsPositive()
  rating: number;
}

export class UpdateDto extends PartialType(CreateDto) {}
