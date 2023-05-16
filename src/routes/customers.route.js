// PACKAGE IMPORTS
import { Router } from 'express';

// VALUE IMPORTS
import {
  retrieveCustomers,
  retrieveCustomerById,
} from '../controllers/customers.controller.js';

// GLOBAL CONSTANTS
const customersRouter = Router();

// FUNCTIONS
customersRouter.get('/customers', retrieveCustomers);
customersRouter.get('/customer/:id', retrieveCustomerById);

// VALUE EXPORTS
export default customersRouter;
