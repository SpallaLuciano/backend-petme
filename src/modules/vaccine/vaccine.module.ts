import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vaccine } from '../../entities';
import { VaccineController } from './vaccine.controller';
import { VaccineService } from './vaccine.service';
import { VisitTypeModule } from '../visit-type/visit-type.module';

@Module({
  imports: [TypeOrmModule.forFeature([Vaccine]), VisitTypeModule],
  providers: [VaccineService],
  controllers: [VaccineController],
  exports: [VaccineService],
})
export class VaccineModule {}
