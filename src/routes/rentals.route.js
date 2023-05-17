// PACKAGE IMPORTS
import { Router } from 'express';

// VALUE IMPORTS
import retrieveRentals from '../controllers/rentals.controller.js';

// GLOBAL CONSTANTS
const rentalsRouter = Router();

// FUNCTIONS
rentalsRouter.get('/rentals', retrieveRentals);

// VALUE EXPORTS
export default rentalsRouter;
