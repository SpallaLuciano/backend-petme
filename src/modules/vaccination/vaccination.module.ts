import { Module } from '@nestjs/common';
import { VaccineModule } from '../vaccine/vaccine.module';
import { VaccinationController } from './vaccination.controller';
import { VaccinationService } from './vaccination.service';
import { HealthModule } from '../health/health.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vaccination } from '../../entities/vaccination';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vaccination]),
    VaccineModule,
    HealthModule,
  ],
  controllers: [VaccinationController],
  providers: [VaccinationService],
})
export class VaccinationModule {}
