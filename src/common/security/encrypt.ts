import { createCipheriv, createDecipheriv, createHash } from 'crypto';
import { encryptEnvs } from '../enviroment';

const { algorithm, secretKey, secretIv } = encryptEnvs;

export function encrypt<T>(value: T): string {
  if (!value) {
    return null;
  }
  const iv = createHash('sha512')
    .update(secretIv)
    .digest('hex')
    .substring(0, 16);

  const valueToEncrypt = JSON.stringify(value);

  const cipher = createCipheriv(algorithm, secretKey, iv);
  const encrypted = Buffer.from(
    cipher.update(valueToEncrypt, 'utf8', 'hex') + cipher.final('hex'),
  ).toString('base64');

  return `${encrypted}::${iv}`;
}

export function decrypt<T>(value: string): T {
  if (!value) {
    return null;
  }
  const [encrypted, iv] = value.split('::');
  const buffer = Buffer.from(encrypted, 'base64');
  const decipher = createDecipheriv(algorithm, secretKey, iv);

  const decrypted =
    decipher.update(buffer.toString('utf8'), 'hex', 'utf8') +
    decipher.final('utf8');

  const parsedValue = JSON.parse(decrypted.toString()) as T;

  return parsedValue;
}
