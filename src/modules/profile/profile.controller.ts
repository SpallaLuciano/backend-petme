import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Auth, Image, Response, successResponse } from '../../common';
import { Profile } from '../../entities';
import { CreateDto, UpdateDto } from './dtos';
import { ProfileService } from './profile.service';

@ApiTags('Perfiles')
@Controller('profiles')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get()
  async find(): Promise<Response<Profile[]>> {
    const profiles = await this.profileService.find();

    return successResponse(profiles);
  }

  @Auth()
  @Get('by-user')
  async findMyProfile(@Request() req): Promise<Response<Profile>> {
    const profile = await this.profileService.findByUser(req.user.id);

    return successResponse(profile);
  }

  @Auth()
  @Post()
  async create(
    @Request() req,
    @Body() dto: CreateDto,
  ): Promise<Response<Profile>> {
    const profile = await this.profileService.create(req.user.id, dto);

    return successResponse(profile);
  }

  @Auth()
  @Put()
  async update(
    @Request() req,
    @Body() dto: UpdateDto,
  ): Promise<Response<Profile>> {
    const profile = await this.profileService.update(req.user.id, dto);

    return successResponse(profile);
  }

  @Image()
  @Auth()
  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  async updateImage(
    @Request() req,
    @UploadedFile()
    file: Express.Multer.File,
  ): Promise<Response<Profile>> {
    const profile = await this.profileService.updateImage(req.user.id, file);

    return successResponse(profile);
  }

  @Auth()
  @Delete('image')
  async removeImage(@Request() req) {
    const profile = await this.profileService.removeImage(req.user.id);

    return successResponse(profile);
  }
}
