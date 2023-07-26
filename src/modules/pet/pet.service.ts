import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WarningException } from '../../common';
import { Pet } from '../../entities';
import { FileService } from '../file/file.service';
import { ProfileService } from '../profile/profile.service';
import { CreateDto, UpdateDto } from './dtos';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pet)
    private petRepository: Repository<Pet>,
    private profileService: ProfileService,
    private fileService: FileService,
  ) {}

  async create(userId: string, dto: CreateDto): Promise<Pet> {
    const profile = await this.profileService.findByUser(userId);

    let pet = this.petRepository.create({
      ...dto,
      owner: { id: profile.id },
      health: {
        weight: null,
      },
    });

    await this.petRepository.save(pet);

    pet = await this.findById(pet.id);

    return pet;
  }

  async update(userId: string, petId: string, dto: UpdateDto): Promise<Pet> {
    let pet = await this.findByUserAndId(userId, petId);

    pet = Object.assign(pet, dto);

    await this.petRepository.save(pet);

    return pet;
  }

  async find(): Promise<Pet[]> {
    const pets = await this.petRepository.find({
      relations: {
        health: true,
        images: true,
      },
      loadRelationIds: {
        relations: ['owner'],
      },
    });

    return pets;
  }

  async remove(userId: string, petId: string): Promise<Pet> {
    const pet = await this.findByUserAndId(userId, petId);

    return await this.petRepository.remove(pet);
  }

  async createImage(
    userId: string,
    petId: string,
    file: Express.Multer.File,
  ): Promise<Pet> {
    const pet = await this.findByUserAndId(userId, petId);

    const image = await this.fileService.createImage(pet.name, file);

    pet.images.push(image);

    await this.petRepository.save(pet);

    return pet;
  }

  async removeImage(
    userId: string,
    petId: string,
    imageId: string,
  ): Promise<Pet> {
    let pet = await this.findByUserAndId(userId, petId);

    if (!pet || !pet.images.some((image) => image.id === imageId)) {
      throw new WarningException(
        'No tiene permisos para realizar la operacion',
      );
    }

    await this.fileService.removeImage(imageId);

    pet = await this.findById(pet.id);

    return pet;
  }

  async like(userId: string, petId: string) {
    const profile = await this.profileService.petLike(userId, petId);

    return profile;
  }

  private async findByUserAndId(userId: string, petId: string): Promise<Pet> {
    const pet = await this.petRepository.findOne({
      where: { id: petId, owner: { user: { id: userId } } },
      relations: {
        health: true,
        images: true,
      },
      loadRelationIds: {
        relations: ['owner'],
      },
    });

    if (!pet) {
      throw new WarningException('No se encontró la mascota');
    }

    return pet;
  }

  async findById(id: string): Promise<Pet> {
    const pet = await this.petRepository.findOne({
      where: { id },
      relations: {
        health: true,
        images: true,
      },
      loadRelationIds: {
        relations: ['owner'],
      },
    });

    if (!pet) {
      throw new WarningException('No se encontro la mascota');
    }

    return pet;
  }
}
