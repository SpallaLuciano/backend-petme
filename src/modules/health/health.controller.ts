import { Body, Controller, Param, Put, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth, Response, successResponse } from '../../common';
import { Health } from '../../entities';
import { UpdateHealthDto } from './dtos';
import { HealthService } from './health.service';

@ApiTags('Salud')
@Controller('health')
export class HealthController {
  constructor(private healthService: HealthService) {}

  @Auth()
  @Put(':id')
  async updateHealth(
    @Request() req,
    @Param('id') healthId: string,
    @Body() dto: UpdateHealthDto,
  ): Promise<Response<Health>> {
    const health = await this.healthService.updateHealth(
      req.user.id,
      healthId,
      dto,
    );

    return successResponse(health);
  }
}
