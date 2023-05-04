import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from '../../entities';
import { FileModule } from '../file/file.module';
import { ProfileModule } from '../profile/profile.module';
import { PetController } from './pet.controller';
import { PetService } from './pet.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pet]), FileModule, ProfileModule],
  controllers: [PetController],
  providers: [PetService],
})
export class PetModule {}
