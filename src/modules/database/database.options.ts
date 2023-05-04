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
  entities: [Profile, User, Image, Comment, Pet, VisitType, Visit, Health],
  logging: true,
  synchronize: true,
};
