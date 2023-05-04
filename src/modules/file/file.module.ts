import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from '../../entities';
import { FileService } from './file.service';

@Module({
  imports: [TypeOrmModule.forFeature([Image])],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
