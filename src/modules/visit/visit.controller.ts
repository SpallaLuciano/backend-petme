import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth, Response, successResponse } from '../../common';
import { Health, Visit } from '../../entities';
import { CreateDto, UpdateDto } from './dtos';
import { VisitService } from './visit.service';

@ApiTags('Visitas')
@Controller('visits')
export class VisitController {
  constructor(private visitService: VisitService) {}

  @Auth()
  @Get(':petId')
  async findAllByPet(
    @Param('petId') petId: string,
  ): Promise<Response<Visit[]>> {
    const visits = await this.visitService.findAllByPet(petId);

    return successResponse(visits);
  }

  @Auth()
  @Post(':petId')
  async create(
    @Request() req,
    @Param('petId') petId: string,
    @Body() dto: CreateDto,
  ): Promise<Response<Health>> {
    const visit = await this.visitService.create(req.user.id, petId, dto);

    return successResponse(visit);
  }

  @Auth()
  @Put(':visitId')
  async update(
    @Request() req,
    @Param('visitId') visitId: string,
    @Body() dto: UpdateDto,
  ): Promise<Response<Health>> {
    const health = await this.visitService.update(req.user.id, visitId, dto);

    return successResponse(health);
  }

  @Auth()
  @Delete(':visitId')
  async remove(
    @Request() req,
    @Param('visitId') visitId: string,
  ): Promise<Response<Health>> {
    const result = await this.visitService.remove(req.user.id, visitId);

    return successResponse(result);
  }
}
