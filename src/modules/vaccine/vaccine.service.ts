import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WarningException } from '../../common';
import { Vaccine } from '../../entities/vaccine';
import { CreateDto, UpdateDto } from './dtos';
import { VisitTypeService } from '../visit-type/visit-type.service';

export class VaccineService {
  constructor(
    @InjectRepository(Vaccine)
    private vaccineRepository: Repository<Vaccine>,
    private visitTypeService: VisitTypeService,
  ) {}

  async find() {
    const vaccines = await this.vaccineRepository.find();
    const visitTypes = await this.visitTypeService.findVisitTypes();

    return { vaccines, visitTypes };
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
    let vaccine = await this.findOneById(id);

    vaccine = await this.vaccineRepository.remove(vaccine);

    return vaccine;
  }
}
