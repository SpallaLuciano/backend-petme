import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WarningException } from '../../common';
import { VisitType } from '../../entities';
import { CreateDto } from './dtos';

@Injectable()
export class VisitTypeService {
  constructor(
    @InjectRepository(VisitType)
    private visitTypeRepository: Repository<VisitType>,
  ) {}

  async findByName(name: string) {
    const visitType = await this.visitTypeRepository.findOneBy({ name });

    if (!visitType) {
      throw new WarningException('No se encontró el tipo de visita');
    }

    return visitType;
  }

  async createVisitType(dto: CreateDto) {
    const visitType = this.visitTypeRepository.create(dto);

    const newVisitType = await this.visitTypeRepository.save(visitType);

    return newVisitType;
  }

  async deleteVisitType(id: string) {
    const visitType = await this.visitTypeRepository.findOneBy({ id });

    if (!visitType) {
      throw new WarningException('No se encontró el tipo de visita');
    }

    await this.visitTypeRepository.remove(visitType);

    return true;
  }

  async findVisitTypes() {
    return await this.visitTypeRepository.find();
  }
}
