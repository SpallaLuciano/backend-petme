import { genSalt, hash as hashBcrypt, compare } from 'bcrypt';
import { hashEnvs } from '../enviroment';

const { saltRounds } = hashEnvs();

export async function hash(value: string) {
  const salt = await genSalt(saltRounds);
  const hashedValue = await hashBcrypt(value, salt);

  return hashedValue;
}

export async function compareHash(value: string, hashed: string) {
  return await compare(value, hashed);
}
