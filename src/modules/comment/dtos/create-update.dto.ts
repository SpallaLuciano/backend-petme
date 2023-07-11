import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import { parseISO } from 'date-fns';

export class CreateDto {
  @ApiProperty()
  @IsString()
  @IsUUID()
  recipientId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  comment: string;

  @ApiPropertyOptional({ type: Date })
  @IsOptional()
  @Transform(({ value }) => parseISO(value))
  datetime: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  rating: number;
}

export class UpdateDto extends PartialType(CreateDto) {}
