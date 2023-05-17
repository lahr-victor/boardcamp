// PACKAGE IMPORTS
import { Router } from 'express';

// VALUE IMPORTS
import {
  retrieveRentals,
  registerRental,
} from '../controllers/rentals.controller.js';

// GLOBAL CONSTANTS
const rentalsRouter = Router();

// FUNCTIONS
rentalsRouter.get('/rentals', retrieveRentals);
rentalsRouter.post('/rentals', registerRental);

// VALUE EXPORTS
export default rentalsRouter;
