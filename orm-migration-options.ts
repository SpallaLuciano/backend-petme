import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import {
  Profile,
  User,
  Pet,
  Chat,
  Comment,
  Health,
  Image,
  Message,
  OwnerRequest,
  Evidence,
  UserValidation,
  Vaccination,
  Vaccine,
  Visit,
  VisitType,
} from './src/entities';

config();

export const options: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DB_URL,
  schema: process.env.DB_SCHEMA,
  entities: [
    Profile,
    User,
    Pet,
    Chat,
    Comment,
    Health,
    Image,
    Message,
    OwnerRequest,
    Evidence,
    UserValidation,
    Vaccination,
    Vaccine,
    Visit,
    VisitType,
  ],
  logging: true,
  synchronize: false,
  migrationsRun: false,
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  ssl: true,
};

const dataSource = new DataSource(options);

dataSource.initialize().then(() => {
  console.log('Data source initialized');
});

export default dataSource;
