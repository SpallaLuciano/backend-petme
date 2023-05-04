import { differenceInYears } from 'date-fns';

export function isOlderThan(
  aDate: Date,
  bDate = new Date(),
  difference = 0,
): boolean {
  const diff = differenceInYears(bDate, aDate);

  return diff >= difference;
}
