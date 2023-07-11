import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WarningException } from '../../common';
import { Health } from '../../entities';
import { UpdateHealthDto } from './dtos';

@Injectable()
export class HealthService {
  constructor(
    @InjectRepository(Health)
    private healthRepository: Repository<Health>,
  ) {}

  createDefaultEntity() {
    return this.healthRepository.create({ weight: null });
  }

  async findOneByUserAndId(
    userId: string,
    healthId: string,
    loadRelations: string[] = [],
    loadRelationsIds: string[] = [],
  ) {
    const health = await this.healthRepository.findOne({
      where: {
        id: healthId,
        pet: {
          owner: {
            user: { id: userId },
          },
        },
      },
      relations: loadRelations,
      loadRelationIds: {
        relations: loadRelationsIds,
      },
    });

    if (!health) {
      throw new WarningException('No se encontró el registro de salud');
    }

    return health;
  }

  async updateHealth(userId: string, healthId: string, dto: UpdateHealthDto) {
    const health = await this.findOneByUserAndId(userId, healthId, [], ['pet']);

    let updatedHealth = Object.assign(health, dto);

    updatedHealth = await this.healthRepository.save(updatedHealth);

    return updatedHealth;
  }

  async findByPetAndUser(userId: string, petId: string) {
    const health = await this.healthRepository.findOne({
      where: {
        pet: {
          owner: {
            user: {
              id: userId,
            },
          },
          id: petId,
        },
      },
      loadRelationIds: {
        relations: ['pet'],
      },
    });

    if (!health) {
      throw new WarningException('No se encontró el registro de salud');
    }

    return health;
  }
}
