import { differenceInYears, addDays } from 'date-fns';
import { jwtEnvs } from './enviroment';

const { expiresIn } = jwtEnvs();

export function isOlderThan(
  aDate: Date,
  bDate = new Date(),
  difference = 0,
): boolean {
  const diff = differenceInYears(bDate, aDate);

  return diff >= difference;
}

export function getExpirationDate() {
  const date = new Date();
  const days = expiresIn.split('d')[0];

  return addDays(date, Number(days));
}
