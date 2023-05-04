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

@ApiTags('Vacunas')
@Controller('vaccines')
export class VaccineController {
  constructor(private vaccineService: VaccineService) {}

  @Auth()
  @Get()
  async find(): Promise<Response<Vaccine[]>> {
    const vaccines = await this.vaccineService.find();

    return successResponse(vaccines);
  }

  @Auth()
  @Get(':id')
  async findOneById(@Param('id') id: string) {
    const vaccine = await this.vaccineService.findOneById(id);

    return successResponse(vaccine);
  }

  @Auth()
  @Post()
  async create(@Body() dto: CreateDto) {
    const vaccine = await this.vaccineService.create(dto);

    return successResponse(vaccine);
  }

  @Auth()
  @Put(':vaccineId')
  async update(@Param('vaccineId') vaccineId: string, @Body() dto: UpdateDto) {
    const vaccine = await this.vaccineService.update(vaccineId, dto);

    return successResponse(vaccine);
  }

  @Auth()
  @Delete(':vaccineId')
  async remove(@Param('vaccineId') vaccineId: string) {
    const result = await this.vaccineService.remove(vaccineId);

    return successResponse(result);
  }
}
