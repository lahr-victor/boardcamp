// PACKAGE IMPORTS
import { Router } from 'express';

// VALUE IMPORTS
import {
  finishRental,
  retrieveRentals,
  registerRental,
} from '../controllers/rentals.controller.js';

// GLOBAL CONSTANTS
const rentalsRouter = Router();

// FUNCTIONS
rentalsRouter.post('/rentals/:id/return', finishRental);
rentalsRouter.get('/rentals', retrieveRentals);
rentalsRouter.post('/rentals', registerRental);

// VALUE EXPORTS
export default rentalsRouter;
