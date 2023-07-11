import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsUUID } from 'class-validator';
import { parseISO } from 'date-fns';
import { IsBeforeYears } from '../../../common';

export class CreateVaccinationDto {
  @ApiProperty({ type: Date })
  @Transform(({ value }) => parseISO(value))
  @IsBeforeYears({
    years: 0,
  })
  applicationDate: Date;

  @ApiProperty()
  @IsUUID()
  healthId: string;

  @ApiProperty()
  @IsUUID()
  vaccineId: string;
}

export class UpdateVaccinationDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  vaccineId: string;

  @ApiPropertyOptional({ type: Date })
  @IsOptional()
  @Transform(({ value }) => parseISO(value))
  @IsBeforeYears({ years: 0 })
  applicationDate: Date;
}
