import { PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class CreateHealthDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  weight?: number;
}

export class UpdateHealthDto extends PartialType(CreateHealthDto) {}
