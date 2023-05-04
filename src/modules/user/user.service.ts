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

      const serialized = { ...user.profile };

      user.profile = serialized as Profile;

      return user;
    } catch (error) {
      throw new ErrorException('Hubo un problema al buscar usuarios', error);
    }
  }

  async create({ email, password }: CreateDto): Promise<User> {
    try {
      const user = await this.userRepository.findOneBy({ email });

      if (user) {
        throw new WarningException('Email ya registrado');
      }

      const newUser = await this.userRepository.create({
        email,
        password,
      });

      await this.userRepository.save(newUser);

      await this.userValidationService.sendVerificationMail(newUser);

      return newUser;
    } catch (error) {
      throw new ErrorException('Hubo un problema al crear el usuario', error);
    }
  }

  async update(dto: UpdateDto): Promise<User> {
    try {
      const user = await this.userRepository.findOneBy({ email: dto.email });

      if (!user) {
        throw new WarningException('Usuario no registrado');
      }

      const updatedUser = Object.assign(user, dto);

      await this.userRepository.save(updatedUser);

      return updatedUser;
    } catch (error) {
      console.log(error);

      throw new ErrorException(
        'Hubo un problema al actualizar el usuario',
        error,
      );
    }
  }

  async validateUser(user: User): Promise<User> {
    user.validated = true;

    return await this.userRepository.save(user);
  }

  async updatePassword(user: User, password: string) {
    user.password = password;

    return await this.userRepository.save(user);
  }
}
