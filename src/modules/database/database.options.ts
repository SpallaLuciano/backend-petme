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

const { host, port, database, username, password, schema } = databaseEnvs;

export const options: TypeOrmModuleOptions = {
  type: 'postgres',
  host: host,
  port: port,
  database: database,
  username: username,
  password: password,
  schema: schema,
  entities: [
    Profile,
    User,
    Image,
    Comment,
    OwnerRequest,
    Evidence,
    Vaccination,
    Vaccine,
    Pet,
    VisitType,
    Visit,
    Health,
    Chat,
    Message,
    UserValidation,
  ],
  logging: true,
  synchronize: true,
};
