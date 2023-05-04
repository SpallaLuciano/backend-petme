import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Profile, User } from './src/entities';

config();

const db = JSON.parse(process.env.DATABASE);

export const options: DataSourceOptions = {
  type: 'postgres',
  host: db.host,
  port: Number(db.port),
  database: db.database,
  username: db.username,
  password: db.password,
  schema: db.schema,
  entities: [User, Profile],
  logging: true,
  synchronize: false,
  migrationsRun: false,
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
};

const dataSource = new DataSource(options);

dataSource.initialize().then(() => {
  console.log('Data source initialized');
});

export default dataSource;
