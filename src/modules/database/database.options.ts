import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { databaseEnvs } from '../../common';
import {
  Profile,
  User,
  Image,
  Comment,
  VisitType,
  Visit,
  Pet,
  Health,
  Chat,
  Message,
  UserValidation,
  Vaccine,
  Evidence,
  OwnerRequest,
  Vaccination,
} from '../../entities';

const { url, schema } = databaseEnvs();

export const options: TypeOrmModuleOptions = {
  url,
  type: 'postgres',
  schema,
  entities: [
    Pet,
    Profile,
    User,
    Image,
    Comment,
    OwnerRequest,
    Evidence,
    Vaccination,
    Vaccine,
    VisitType,
    Visit,
    Health,
    Chat,
    Message,
    UserValidation,
  ],
  logging: true,
  synchronize: true,
  ssl: true,
};
