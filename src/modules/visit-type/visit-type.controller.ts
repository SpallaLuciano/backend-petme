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
import { VisitType } from '../../entities';
import { CreateDto, UpdateDto } from './dtos';
import { VisitTypeService } from './visit-type.service';

@ApiTags('Tipos de visitas')
@Controller('visit-types')
export class VisitTypeController {
  constructor(private vistTypeService: VisitTypeService) {}

  @Get()
  @Auth()
  async findVisitTypes(): Promise<Response<VisitType[]>> {
    const visitTypes = await this.vistTypeService.findVisitTypes();

    return successResponse(visitTypes);
  }

  @Auth()
  @Post()
  async createVisitType(@Body() dto: CreateDto): Promise<Response<VisitType>> {
    const visitType = await this.vistTypeService.createVisitType(dto);

    return successResponse(visitType);
  }

  @Auth()
  @Put(':name')
  async updateVisitType(@Param('name') name, @Body() dto: UpdateDto) {
    const visitType = await this.vistTypeService.updateVisitType(name, dto);

    return successResponse(visitType);
  }

  @Auth()
  @Delete(':id')
  async removeVisitType(@Param('id') id: string): Promise<Response<boolean>> {
    const result = await this.vistTypeService.deleteVisitType(id);

    return successResponse(result);
  }
}
