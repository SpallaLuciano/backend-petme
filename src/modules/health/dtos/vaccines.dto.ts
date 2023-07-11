import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { parseISO } from 'date-fns';

export class AddRemoveVaccineDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  vaccine: string;

  @ApiProperty({ type: Date })
  @Transform(({ value }) => parseISO(value))
  datetime: Date;
}
