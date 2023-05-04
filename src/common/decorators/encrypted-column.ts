import { Column, ColumnOptions } from 'typeorm';
import { decrypt, encrypt } from '../security';

export function EncryptedColumn<T>(options?: ColumnOptions): PropertyDecorator {
  const transformer = {
    from: (value: string): T => {
      return decrypt<T>(value);
    },
    to: (value: T): string => {
      return encrypt<T>(value);
    },
  };

  return Column({
    ...options,
    transformer,
  });
}
