import { registerDecorator, ValidatorOptions } from 'class-validator';
import { subYears } from 'date-fns';
import { isOlderThan } from '../date';

export function IsBeforeYears(
  args: { years?: number; date?: Date },
  validationOptions?: ValidatorOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: Date) {
          let date = args.date ? args.date : new Date();
          date = subYears(date, args.years || 0);

          return isOlderThan(value, date);
        },
        defaultMessage: () => {
          let date = args.date ? args.date : new Date();
          date = subYears(date, args.years || 0);

          return `La fecha debe ser anterior a ${date
            .toISOString()
            .substring(0, 10)}`;
        },
      },
    });
  };
}
