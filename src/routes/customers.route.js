// PACKAGE IMPORTS
import { Router } from 'express';

// VALUE IMPORTS
import {
  retrieveCustomers,
  retrieveCustomerById,
  registerCustomer,
  updateCustomer,
} from '../controllers/customers.controller.js';
import customerSchema from '../schemas/customers.schema.js';
import validateSchema from '../middlewares/validateSchema.middleware.js';

// GLOBAL CONSTANTS
const customersRouter = Router();

// FUNCTIONS
customersRouter.get('/customers', retrieveCustomers);
customersRouter.get('/customer/:id', retrieveCustomerById);
customersRouter.post('/customers', validateSchema(customerSchema), registerCustomer);
customersRouter.put('/customers/:id', validateSchema(customerSchema), updateCustomer);

// VALUE EXPORTS
export default customersRouter;
