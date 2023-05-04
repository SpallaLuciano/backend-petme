import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WarningException } from '../../common';
import { Health } from '../../entities';
import { VaccineService } from '../vaccine/vaccine.service';
import { UpdateHealthDto } from './dtos';
import { AddRemoveVaccineDto } from './dtos/vaccines.dto';

@Injectable()
export class HealthService {
  constructor(
    @InjectRepository(Health)
    private healthRepository: Repository<Health>,
    private vaccineService: VaccineService,
  ) {}

  async findOneByUserAndId(userId: string, healthId: string) {
    const health = await this.healthRepository.findOneBy({
      id: healthId,
      pet: {
        owner: {
          user: { id: userId },
        },
      },
    });

    if (!health) {
      throw new WarningException('No se encontró el registro de salud');
    }

    return health;
  }

  async updateHealth(userId: string, healthId: string, dto: UpdateHealthDto) {
    const health = await this.findOneByUserAndId(userId, healthId);

    let updatedHealth = Object.assign(health, dto);

    updatedHealth = await this.healthRepository.save(updatedHealth);

    return updatedHealth;
  }

  async findByPetAndUser(userId: string, petId: string) {
    const health = await this.healthRepository.findOneBy({
      pet: {
        owner: {
          user: {
            id: userId,
          },
        },
        id: petId,
      },
    });

    if (!health) {
      throw new WarningException('No se encontró el registro de salud');
    }

    return health;
  }

  async vaccine(
    userId: string,
    healthId: string,
    { vaccine: vacId }: AddRemoveVaccineDto,
  ) {
    const vaccine = await this.vaccineService.findOneById(vacId);
    let health = await this.findOneByUserAndId(userId, healthId);

    if (vaccine.petKind !== health.pet.kind) {
      throw new WarningException(
        'La vacuna ingresada no corresponde con la especie',
      );
    }

    const isVaccine = health.vaccines.some((vac) => vac === vacId);

    if (isVaccine) {
      health.vaccines = health.vaccines.filter((vac) => vac !== vacId);
    } else {
      health.vaccines.push(vacId);
    }

    health = await this.healthRepository.save(health);

    return health;
  }
}
