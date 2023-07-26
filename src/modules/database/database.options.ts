import { TypeOrmModuleOptions } from '@nestjs/typeorm';
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

export const options: TypeOrmModuleOptions = {
  url: process.env.DB_URL,
  type: 'postgres',
  schema: process.env.DB_SCHEMA,
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
  logging: process.env.NODE_ENV === 'development',
  synchronize: process.env.NODE_ENV === 'development',
  ssl:
    process.env.NODE_ENV === 'development'
      ? false
      : {
          rejectUnauthorized: false,
          requestCert: true,
        },
};
