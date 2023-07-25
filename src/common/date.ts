import { differenceInYears, addDays } from 'date-fns';

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
  const days = process.env.JWT_EXPIRES_IN.split('d')[0];

  return addDays(date, Number(days));
}
