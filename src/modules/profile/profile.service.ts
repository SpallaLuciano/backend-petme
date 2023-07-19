import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ErrorException, WarningException } from '../../common';
import { Profile } from '../../entities';
import { FileService } from '../file/file.service';
import { UserService } from '../user/user.service';
import { CreateProfileDto, UpdateDto } from './dtos';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    private userService: UserService,
    private fileService: FileService,
  ) {}

  async findByUser(userId: string) {
    const profile = await this.profileRepository
      .createQueryBuilder('profile')
      .innerJoin('profile.user', 'user', 'user.id = :userId', { userId })
      .leftJoinAndSelect('profile.comments', 'comments')
      .leftJoinAndSelect('profile.ownComments', 'ownComments')
      .leftJoinAndSelect('profile.image', 'image')
      .loadRelationIdAndMap('profile.favs', 'profile.favs')
      .loadRelationIdAndMap('comments.recipient', 'comments.recipient')
      .loadRelationIdAndMap('comments.author', 'comments.author')
      .loadRelationIdAndMap('ownComments.recipient', 'ownComments.recipient')
      .loadRelationIdAndMap('ownComments.author', 'ownComments.author')
      .getOne();

    if (!profile) {
      throw new WarningException('No se encontró el perfil');
    }

    return profile;
  }

  async find(): Promise<Profile[]> {
    const profiles = await this.profileRepository
      .createQueryBuilder('profile')
      .leftJoinAndSelect('profile.comments', 'comments')
      .leftJoinAndSelect('profile.ownComments', 'ownComments')
      .leftJoinAndSelect('profile.image', 'image')
      .loadRelationIdAndMap('profile.favs', 'profile.favs')
      .loadRelationIdAndMap('comments.recipient', 'comments.recipient')
      .loadRelationIdAndMap('comments.author', 'comments.author')
      .loadRelationIdAndMap('ownComments.recipient', 'ownComments.recipient')
      .loadRelationIdAndMap('ownComments.author', 'ownComments.author')
      .getMany();

    return profiles;
  }

  async create(userId: string, dto: CreateProfileDto): Promise<Profile> {
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

    await this.fileService.removeImage(profile.image.id, 'profile');

    profile.image = null;

    await this.profileRepository.save(profile);

    return profile;
  }

  async petLike(userId: string, petId: string): Promise<Profile> {
    const profile = await this.profileRepository
      .createQueryBuilder('profile')
      .loadRelationIdAndMap('profile.favs', 'profile.favs')
      .where('profile.userId = :userId', { userId })
      .getOne();
    const profileHasLike = (profile.favs as unknown as string[]).some(
      (id) => petId === id,
    );

    if (profileHasLike) {
      await this.profileRepository
        .createQueryBuilder('profile')
        .relation('favs')
        .of(profile.id)
        .remove(petId);
    } else {
      await this.profileRepository
        .createQueryBuilder('profile')
        .relation('favs')
        .of(profile.id)
        .add(petId);
    }

    return await this.findById(profile.id);
  }

  async findById(id: string) {
    const profile = await this.profileRepository
      .createQueryBuilder('profile')
      .leftJoinAndSelect('profile.comments', 'comments')
      .leftJoinAndSelect('profile.ownComments', 'ownComments')
      .leftJoinAndSelect('profile.image', 'image')
      .loadRelationIdAndMap('profile.favs', 'profile.favs')
      .loadRelationIdAndMap('comments.recipient', 'comments.recipient')
      .loadRelationIdAndMap('comments.author', 'comments.author')
      .loadRelationIdAndMap('ownComments.recipient', 'ownComments.recipient')
      .loadRelationIdAndMap('ownComments.author', 'ownComments.author')
      .where('profile.id = :id', { id })
      .getOne();

    if (!profile) {
      throw new WarningException('No se encontró el perfil');
    }

    return profile;
  }
}
