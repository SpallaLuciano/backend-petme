import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { CreateDto } from './dtos/create-update.dto';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { Auth, Response, successResponse } from '../../common';
import { User } from '../../entities';

@ApiTags('Usuarios')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth()
  @Get()
  async findBy(@Request() req): Promise<Response<User>> {
    const user = await this.userService.findOneBy({ id: req.user.id });

    return successResponse(user);
  }

  @Post()
  async create(@Body() dto: CreateDto): Promise<Response<User>> {
    const user = await this.userService.create(dto);

    return successResponse(user);
  }
}
