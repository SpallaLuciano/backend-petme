import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisitType } from '../../entities';
import { VisitTypeController } from './visit-type.controller';
import { VisitTypeService } from './visit-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([VisitType])],
  controllers: [VisitTypeController],
  providers: [VisitTypeService],
  exports: [VisitTypeService],
})
export class VisitTypeModule {}
