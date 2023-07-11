import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { VaccinationService } from './vaccination.service';
import {
  CreateVaccinationDto,
  UpdateVaccinationDto,
} from './dtos/vaccination.dto';
import { Auth, successResponse } from '../../common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Vacunaciones')
@Controller('vaccination')
export class VaccinationController {
  constructor(private vaccinationService: VaccinationService) {}

  @Auth()
  @Post()
  async create(@Body() dto: CreateVaccinationDto, @Request() req) {
    const vaccination = await this.vaccinationService.createVaccination(
      dto,
      req.user.id,
    );

    return successResponse(vaccination);
  }

  @Auth()
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateVaccinationDto,
    @Request() req,
  ) {
    const health = await this.vaccinationService.updateVaccination(
      id,
      dto,
      req.user.id,
    );

    return successResponse(health);
  }

  @Auth()
  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    const health = await this.vaccinationService.removeVaccination(
      id,
      req.user.id,
    );

    return successResponse(health);
  }
}
