import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vaccine } from '../../entities';
import { VaccineController } from './vaccine.controller';
import { VaccineService } from './vaccine.service';

@Module({
  imports: [TypeOrmModule.forFeature([Vaccine])],
  providers: [VaccineService],
  controllers: [VaccineController],
  exports: [VaccineService],
})
export class VaccineModule {}
