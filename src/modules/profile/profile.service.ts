import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ErrorException, WarningException } from '../../common';
import { Profile } from '../../entities';
import { FileService } from '../file/file.service';
import { UserService } from '../user/user.service';
import { CreateDto, UpdateDto } from './dtos';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    private userService: UserService,
    private fileService: FileService,
  ) {}

  async findByUser(userId: string) {
    const profile = await this.profileRepository.findOneBy({
      user: { id: userId },
    });

    if (!profile) {
      throw new WarningException('No se encontró el perfil');
    }

    return profile;
  }

  async find(): Promise<Profile[]> {
    const profiles = await this.profileRepository.find();

    return profiles;
  }

  async create(userId: string, dto: CreateDto): Promise<Profile> {
    const user = await this.userService.findOneBy({
      id: userId,
    });

    if (!user) {
      throw new WarningException(
        'No se encontró el usuario para el id ingresado',
      );
    }

    try {
      const profile = this.profileRepository.create({ ...dto, user });

      await this.profileRepository.save(profile);

      return profile;
    } catch (error) {
      throw new ErrorException('Hubo un problema al crear el perfil', error);
    }
  }

  async update(userId: string, dto: UpdateDto): Promise<Profile> {
    const profile = await this.profileRepository.findOneBy({
      user: { id: userId },
    });

    if (!profile) {
      throw new WarningException('El perfil a actualizar no existe');
    }

    const updatedProfile = Object.assign(profile, dto);

    await this.profileRepository.save(updatedProfile);

    return updatedProfile;
  }

  async updateImage(
    userId: string,
    file: Express.Multer.File,
  ): Promise<Profile> {
    const profile = await this.findByUser(userId);

    const image = await this.fileService.createImage(
      `${profile.name} ${profile.lastname}`,
      file,
    );

    profile.image = image;

    await this.profileRepository.save(profile);

    return profile;
  }

  async removeImage(userId: string) {
    const profile = await this.findByUser(userId);

    await this.fileService.removeImage(profile.image.id);

    profile.image = null;

    await this.profileRepository.save(profile);

    return profile;
  }

  async petLike(profile: Profile, petId: string): Promise<boolean> {
    const isId = profile.favs.some((id) => id === petId);
    let liked = true;

    if (isId) {
      profile.favs = profile.favs.filter((id) => id !== petId);
      liked = false;
    } else {
      profile.favs.push(petId);
    }

    await this.profileRepository.save(profile);

    return liked;
  }

  async findById(id: string) {
    const profile = this.profileRepository.findOneBy({ id });

    if (!profile) {
      throw new WarningException('No se encontró el perfil');
    }

    return profile;
  }
}
