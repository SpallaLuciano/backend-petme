import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateDto {
  @ApiProperty()
  @IsString()
  @IsUUID()
  profileId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  comment: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  rating: number;
}

export class UpdateDto extends PartialType(CreateDto) {}
