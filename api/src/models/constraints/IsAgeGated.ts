import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsAgeGated() {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isAgeGated',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (!value) {
            return true
          }
          const now = new Date()
          const oneYear = 1000.0 * 60.0 * 60.0 * 24.0 * 365.0
          const minimumAge = 16.0
          const currentAge = (now.getTime() - new Date(value).getTime()) / oneYear
          return currentAge > minimumAge
        },
      },
    })
  }
}