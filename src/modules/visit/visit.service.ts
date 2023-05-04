import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WarningException } from '../../common';
import { Visit } from '../../entities';
import { HealthService } from '../health/health.service';
import { VisitTypeService } from '../visit-type/visit-type.service';
import { CreateDto, UpdateDto } from './dtos';

@Injectable()
export class VisitService {
  constructor(
    @InjectRepository(Visit)
    private visitRepository: Repository<Visit>,
    private visitTypeService: VisitTypeService,
    private healthService: HealthService,
  ) {}

  async findOneByUserAndId(userId: string, visitId: string) {
    const visit = await this.visitRepository.findOneBy({
      id: visitId,
      health: { pet: { owner: { user: { id: userId } } } },
    });

    if (!visit) {
      throw new WarningException('No se encontró la visita');
    }

    return visit;
  }

  findAllByPet(petId: string) {
    return this.visitRepository.findBy({ health: { pet: { id: petId } } });
  }

  async create(userId: string, petId: string, dto: CreateDto) {
    const visitType = await this.visitTypeService.findByName(dto.visitType);
    const health = await this.healthService.findByPetAndUser(userId, petId);

    let visit = this.visitRepository.create({
      ...dto,
      health: health,
      type: visitType,
    });

    visit = await this.visitRepository.save(visit);

    return visit;
  }

  async update(userId: string, visitId: string, dto: UpdateDto) {
    const visit = await this.findOneByUserAndId(userId, visitId);

    if (dto.visitType) {
      const visitType = await this.visitTypeService.findByName(dto.visitType);

      visit.type = visitType;
    }

    Object.assign(visit, dto);

    const updatedVisit = await this.visitRepository.save(visit);

    return updatedVisit;
  }

  async remove(userId, visitId) {
    const visit = await this.findOneByUserAndId(userId, visitId);

    await this.visitRepository.remove(visit);

    return true;
  }
}
