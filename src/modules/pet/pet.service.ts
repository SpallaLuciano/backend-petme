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

    const pet = this.petRepository.create({ ...dto, owner: profile });

    await this.petRepository.save(pet);

    return pet;
  }

  async update(userId: string, petId: string, dto: UpdateDto): Promise<Pet> {
    const pet = await this.findByUserAndId(userId, petId);

    const updatedPet = Object.assign(pet, dto);

    await this.petRepository.save(updatedPet);

    return updatedPet;
  }

  async find(): Promise<Pet[]> {
    const pets = await this.petRepository.find();

    return pets;
  }

  async remove(userId: string, petId: string): Promise<boolean> {
    const pet = await this.findByUserAndId(userId, petId);

    await this.petRepository.remove(pet);

    return true;
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

  async removeImage(userId: string, imageId: string): Promise<Pet> {
    const pet = await this.petRepository.findOneBy({
      owner: { id: userId },
      images: { id: imageId },
    });

    await this.fileService.removeImage(imageId);

    pet.images = pet.images.filter((image) => image.id !== imageId);

    await this.petRepository.save(pet);

    return pet;
  }

  async like(userId: string, petId: string) {
    const profile = await this.profileService.findByUser(userId);

    const pet = await this.petRepository.findOneBy({ id: petId });

    if (!pet) {
      throw new WarningException('No se encontró la mascota');
    }

    const like = await this.profileService.petLike(profile, pet.id);

    return {
      petId,
      like,
    };
  }

  private async findByUserAndId(userId: string, petId: string): Promise<Pet> {
    const pet = await this.petRepository.findOne({
      where: { id: petId, owner: { user: { id: userId } } },
    });

    if (!pet) {
      throw new WarningException('No se encontró la mascota');
    }

    return pet;
  }
}
