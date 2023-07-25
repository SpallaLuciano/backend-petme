import { genSalt, hash as hashBcrypt, compare } from 'bcrypt';

export async function hash(value: string) {
  const salt = await genSalt(Number(process.env.HASH_SALT));
  const hashedValue = await hashBcrypt(value, salt);

  return hashedValue;
}

export async function compareHash(value: string, hashed: string) {
  return await compare(value, hashed);
}
