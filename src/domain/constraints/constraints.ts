import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";

const hexPattern = /^([0-9A-Fa-f]+)$/g;

export const IsHexString = (property: string, validationOptions?: ValidationOptions) => {
	return (object: Object, propertyName: string): any => {
		registerDecorator({
			name: "isHexString",
			target: object.constructor,
			propertyName: propertyName,
			constraints: [property],
			options: validationOptions,
			validator: {
				validate(value: any, args: ValidationArguments) {
					return hexPattern.test(value) && typeof value === "string";
				},
			},
		});
	};
};
