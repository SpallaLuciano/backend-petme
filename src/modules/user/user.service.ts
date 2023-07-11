import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Profile, User } from '../../entities';
import { WarningException, ErrorException } from '../../common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindByDto, CreateDto, UpdateDto } from './dtos';
import { UserValidationService } from '../user-validation/user-validation.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private userValidationService: UserValidationService,
  ) {}

  async findOneBy(findBy: FindByDto): Promise<User> {
    try {
      const user = await this.userRepository.findOneBy(findBy);

      if (user.profile) {
        user.profile = { ...user.profile } as Profile;
      }

      return user;
    } catch (error) {
      throw new ErrorException('Hubo un problema al buscar usuarios', error);
    }
  }

  async create({ email, password, profile }: CreateDto): Promise<boolean> {
    let user: User;
    const queryRunner =
      this.userRepository.manager.connection.createQueryRunner();

    try {
      user = await this.userRepository.findOneBy({ email });
    } catch (error) {
      throw new ErrorException('Hubo un problema al crear el usuario', error);
    }

    if (user) {
      throw new WarningException('Email ya registrado');
    }

    try {
      await queryRunner.startTransaction();

      user = await queryRunner.manager.create(User, {
        email,
        password,
        profile,
      });

      user = await queryRunner.manager.save(user);

      await this.userValidationService.sendVerificationMail(user, queryRunner);

      await queryRunner.commitTransaction();

      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new ErrorException('Hubo un problema al crear el usuario', error);
    } finally {
      await queryRunner.release();
    }
  }

  async update(dto: UpdateDto): Promise<User> {
    try {
      let user = await this.userRepository.findOneBy({ email: dto.email });

      if (!user) {
        throw new WarningException('Usuario no registrado');
      }

      user = Object.assign(user, dto);

      user = await this.userRepository.save(user);

      return user;
    } catch (error) {
      if (error instanceof WarningException) {
        throw error;
      }

      throw new ErrorException(
        'Hubo un problema al actualizar el usuario',
        error,
      );
    }
  }

  async validateUser(user: User): Promise<User> {
    return await this.userRepository.save({ id: user.id, validated: true });
  }

  async updatePassword(user: User, password: string) {
    user.password = password;

    return await this.userRepository.save(user);
  }
}
