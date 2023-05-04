import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Visit } from '../../entities';
import { HealthModule } from '../health/health.module';
import { VisitTypeModule } from '../visit-type/visit-type.module';
import { VisitController } from './visit.controller';
import { VisitService } from './visit.service';

@Module({
  imports: [VisitTypeModule, HealthModule, TypeOrmModule.forFeature([Visit])],
  controllers: [VisitController],
  providers: [VisitService],
})
export class VisitModule {}
