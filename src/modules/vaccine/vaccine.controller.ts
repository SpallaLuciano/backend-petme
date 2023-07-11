import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth, Response, successResponse } from '../../common';
import { Vaccine } from '../../entities/vaccine';
import { CreateDto, UpdateDto } from './dtos';
import { VaccineService } from './vaccine.service';
import { VisitType } from '../../entities';

@ApiTags('Vacunas')
@Controller('vaccines')
export class VaccineController {
  constructor(private vaccineService: VaccineService) {}

  @Auth()
  @Get()
  async find(): Promise<
    Response<{ vaccines: Vaccine[]; visitTypes: VisitType[] }>
  > {
    const vaccinesAndVisitTypes = await this.vaccineService.find();

    return successResponse(vaccinesAndVisitTypes);
  }

  @Auth()
  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<Response<Vaccine>> {
    const vaccine = await this.vaccineService.findOneById(id);

    return successResponse(vaccine);
  }

  @Auth()
  @Post()
  async create(@Body() dto: CreateDto): Promise<Response<Vaccine>> {
    const vaccine = await this.vaccineService.create(dto);

    return successResponse(vaccine);
  }

  @Auth()
  @Put(':vaccineId')
  async update(
    @Param('vaccineId') vaccineId: string,
    @Body() dto: UpdateDto,
  ): Promise<Response<Vaccine>> {
    const vaccine = await this.vaccineService.update(vaccineId, dto);

    return successResponse(vaccine);
  }

  @Auth()
  @Delete(':vaccineId')
  async remove(
    @Param('vaccineId') vaccineId: string,
  ): Promise<Response<Vaccine>> {
    const result = await this.vaccineService.remove(vaccineId);

    return successResponse(result);
  }
}
