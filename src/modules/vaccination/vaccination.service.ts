import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Vaccination } from '../../entities/vaccination';
import { InjectRepository } from '@nestjs/typeorm';
import { VaccineService } from '../vaccine/vaccine.service';
import { HealthService } from '../health/health.service';
import {
  CreateVaccinationDto,
  UpdateVaccinationDto,
} from './dtos/vaccination.dto';
import { WarningException } from '../../common';
import { Health, Vaccine } from '../../entities';

@Injectable()
export class VaccinationService {
  constructor(
    @InjectRepository(Vaccination)
    private vaccinationRepository: Repository<Vaccination>,
    private vaccineService: VaccineService,
    private healthService: HealthService,
  ) {}

  async findByIdAndUser(id: string, userId: string) {
    const vaccination = await this.vaccinationRepository.findOne({
      where: {
        id,
        health: {
          pet: {
            owner: {
              user: {
                id: userId,
              },
            },
          },
        },
      },
      loadRelationIds: { relations: ['health'] },
    });

    if (!vaccination) {
      throw new WarningException('No se encontró la vacunación');
    }

    return vaccination;
  }

  async createVaccination(
    { applicationDate, healthId, vaccineId }: CreateVaccinationDto,
    userId: string,
  ): Promise<Health> {
    const vaccine = await this.vaccineService.findOneById(vaccineId);
    const health = await this.healthService.findOneByUserAndId(
      userId,
      healthId,
      ['vaccinations', 'visits', 'pet'],
    );

    if (health.pet.kind !== vaccine.petKind) {
      throw new WarningException(
        'La vacuna no coincide con la especie del animal',
      );
    }

    if (
      health.vaccinations.find(
        (vaccination) => vaccination.vaccine.id === vaccineId,
      )
    ) {
      throw new WarningException('La vacuna ya se encuentra aplicada');
    }

    const vaccination = this.vaccinationRepository.create({
      applicationDate,
      health,
      vaccine,
    });

    await this.vaccinationRepository.save(vaccination);

    return await this.healthService.findOneByUserAndId(
      userId,
      healthId,
      ['vaccinations', 'visits'],
      ['pet'],
    );
  }

  async removeVaccination(id: string, userId: string) {
    const vaccination = await this.findByIdAndUser(id, userId);

    await this.vaccinationRepository.remove(vaccination);

    return await this.healthService.findOneByUserAndId(
      userId,
      vaccination.health.id,
      ['vaccinations', 'visits'],
      ['pet'],
    );
  }

  async updateVaccination(
    id: string,
    dto: UpdateVaccinationDto,
    userId: string,
  ) {
    const vaccination = await this.findByIdAndUser(id, userId);
    let vaccine: Vaccine;

    if (dto.vaccineId) {
      vaccine = await this.vaccineService.findOneById(dto.vaccineId);
    }

    Object.assign(vaccination, { ...dto, vaccine });

    await this.vaccinationRepository.save(vaccination);

    return await this.healthService.findOneByUserAndId(
      userId,
      vaccination.health as unknown as string,
      ['vaccinations', 'visits'],
      ['pet'],
    );
  }
}
