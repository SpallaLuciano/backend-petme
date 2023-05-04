import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WarningException } from '../../common';
import { Vaccine } from '../../entities/vaccine';
import { CreateDto, UpdateDto } from './dtos';

export class VaccineService {
  constructor(
    @InjectRepository(Vaccine)
    private vaccineRepository: Repository<Vaccine>,
  ) {}

  find() {
    return this.vaccineRepository.find();
  }

  async findOneById(id: string) {
    const vaccine = this.vaccineRepository.findOneBy({ id });

    if (!vaccine) {
      throw new WarningException('No se encontró la vacuna');
    }

    return vaccine;
  }

  async create(dto: CreateDto) {
    let vaccine = this.vaccineRepository.create(dto);

    vaccine = await this.vaccineRepository.save(dto);

    return vaccine;
  }

  async update(id: string, dto: UpdateDto) {
    let vaccine = await this.findOneById(id);

    vaccine = Object.assign(vaccine, dto);

    vaccine = await this.vaccineRepository.save(vaccine);

    return vaccine;
  }

  async remove(id: string) {
    const vaccine = await this.findOneById(id);

    await this.vaccineRepository.remove(vaccine);

    return true;
  }
}
