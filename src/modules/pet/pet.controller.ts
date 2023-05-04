import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UploadedFile,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth, Image, Response, successResponse } from '../../common';
import { Pet } from '../../entities';
import { CreateDto, UpdateDto } from './dtos';
import { PetService } from './pet.service';

@ApiTags('Mascotas')
@Controller('pets')
export class PetController {
  constructor(private petService: PetService) {}

  @Auth()
  @Get()
  async findAll(): Promise<Response<Pet[]>> {
    const pets = await this.petService.find();

    return successResponse(pets);
  }

  @Auth()
  @Post()
  async create(@Request() req, @Body() dto: CreateDto): Promise<Response<Pet>> {
    const pet = await this.petService.create(req.user.id, dto);

    return successResponse(pet);
  }

  @Auth()
  @Put(':id')
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() dto: UpdateDto,
  ): Promise<Response<Pet>> {
    const pet = await this.petService.update(req.user.id, id, dto);

    return successResponse(pet);
  }

  @Auth()
  @Delete(':id')
  async remove(
    @Request() req,
    @Param('id') id: string,
  ): Promise<Response<boolean>> {
    const isRemoved = await this.petService.remove(req.user.id, id);

    return successResponse(isRemoved);
  }

  @Image()
  @Auth()
  @Post('image/:id')
  async updateImage(
    @Request() req,
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Response<Pet>> {
    const pet = await this.petService.createImage(req.user.id, id, file);

    return successResponse(pet);
  }

  @Auth()
  @Delete('image/:imageId')
  async removeImage(
    @Request() req,
    @Param('imageId') imageId: string,
  ): Promise<Response<Pet>> {
    const pet = await this.petService.removeImage(req.user.id, imageId);

    return successResponse(pet);
  }

  @Auth()
  @Get('like/:petId')
  async petLike(@Request() req, @Param('petId') petId) {
    const result = await this.petService.like(req.user.id, petId);

    return successResponse(result);
  }
}
