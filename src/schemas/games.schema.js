// PACKAGE IMPORTS
import joi from 'joi';

// GLOBAL CONSTANTS
const gameSchema = joi.object({
  name: joi.string().min(1).required(),
  image: joi.string().uri(),
  stockTotal: joi.number().integer().greater(0).required(),
  pricePerDay: joi.number().integer().greater(0).required(),
});

// VALUE EXPORTS
export default gameSchema;
