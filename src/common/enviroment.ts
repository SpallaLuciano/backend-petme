import { InternalServerErrorException } from '@nestjs/common';
import { config } from 'dotenv';

interface DatabaseEnvs {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  schema: string;
}

interface EncryptEnvs {
  algorithm: string;
  secretKey: string;
  secretIv: string;
}

interface JwtEnvs {
  secret: string;
  expiresIn: string;
}

interface HashEnvs {
  saltRounds: number;
}

interface BucketEnvs {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucketName: string;
  endpoint: string;
}

interface MailerEnvs {
  frontHost: string;
  verificationEndpoint: string;
  recoverEndpoint: string;
  user: string;
  pass: string;
  host: string;
  port: number;
}

config();

export const databaseEnvs = parseableEnviroment<DatabaseEnvs>('DATABASE');
export const encryptEnvs = parseableEnviroment<EncryptEnvs>('ENCRYPT');
export const jwtEnvs = parseableEnviroment<JwtEnvs>('JWT');
export const hashEnvs = parseableEnviroment<HashEnvs>('HASH');
export const bucketEnvs = parseableEnviroment<BucketEnvs>('BUCKET');
export const mailerEnvs = parseableEnviroment<MailerEnvs>('MAILER');

function parseableEnviroment<T>(name: string): T {
  const env = process.env[name];

  if (!env) {
    throw new InternalServerErrorException(`No ${name} env configured`);
  }

  try {
    return JSON.parse(env) as T;
  } catch (error) {
    console.error(error);
    throw new InternalServerErrorException(`${name} env has a bad format`);
  }
}
