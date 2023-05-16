// PACKAGE IMPORTS
import joi from 'joi';

// GLOBAL CONSTANTS
const customerSchema = joi.object({
  name: joi
    .string()
    .min(1)
    .required(),
  phone: joi
    .string()
    .min(10)
    .max(11)
    .regex(/^[0-9]+$/)
    .required(),
  cpf: joi
    .string()
    .length(11)
    .regex(/^[0-9]+$/)
    .required(),
  birthday: joi
    .date()
    .max('now')
    .required(),
});

// VALUE EXPORTS
export default customerSchema;
