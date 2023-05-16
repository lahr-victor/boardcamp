// PACKAGE IMPORTS
import { Router } from 'express';

// VALUE IMPORTS
import retrieveCustomers from '../controllers/customers.controller.js';

// GLOBAL CONSTANTS
const customersRouter = Router();

// FUNCTIONS
customersRouter.get('/customers', retrieveCustomers);

// VALUE EXPORTS
export default customersRouter;
